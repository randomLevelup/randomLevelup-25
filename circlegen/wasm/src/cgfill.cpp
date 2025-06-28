/**
 * @file cgfill.cpp
 * @author Jupiter Westbard
 * @date 3/21/2025
 * @brief circlegen coloring implementations
 */

#include "wasm_circlegen.h"

#include <iostream>
#include <cmath>
#include <cstdint>
#include <vector>
#include <unordered_map>
#include <algorithm>

#ifndef M_PI
#define M_PI 3.14159265f
#endif

struct dpixelidx { // pixel with index
    uint8_t rgb[3];
    int idx;
}; typedef struct dpixelxy dpixelxy;

struct overlapgroup_ {
    std::unordered_map<uint32_t, std::vector<dpixelidx>> table;
    std::vector<uint32_t> keys;
}; typedef struct overlapgroup_ overlapgroup;

dpixmap quantizeColors(const dpixmap &pm, std::vector<dcircle> &circles) {
    overlapgroup ogroup = {std::unordered_map<uint32_t, std::vector<dpixelidx>>(), std::vector<uint32_t>()};

    for (int y = 0; y < pm.height; ++y) {
        for (int x = 0; x < pm.width; ++x) {
            int pixel_idx = y * pm.width + x;  // Linear pixel index
            int rgb_idx = pixel_idx * 3;       // RGB byte index
            uint8_t r = pm.data[rgb_idx];
            uint8_t g = pm.data[rgb_idx + 1];
            uint8_t b = pm.data[rgb_idx + 2];

            // a pixel's hash key is a 32 bit field with each bit representing containment in a circle.
            uint32_t key = 0;
            for (size_t i = 0; i < circles.size(); ++i) {
                float px = static_cast<float>(x);
                float py = static_cast<float>(y);
                float cx = std::get<0>(circles[i]);
                float cy = std::get<1>(circles[i]);
                float cr = std::get<2>(circles[i]);
                float dist = std::sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
                if (dist < cr) {
                    key |= 1U << i;
                }
            }

            // create the new dpixel and add it to the hash table
            dpixelidx pixel = {{r, g, b}, pixel_idx};
            if (ogroup.table.find(key) == ogroup.table.end()) { // group not found
                ogroup.keys.push_back(key);
                ogroup.table[key] = std::vector<dpixelidx>();
            }
            ogroup.table[key].push_back(pixel);
        }
    }

    std::cout << "Found " << ogroup.keys.size() << " fill sections." << std::endl;

    for (auto &key : ogroup.keys) {
        std::vector<dpixelidx> &pixels = ogroup.table[key];

        // find the dominant channel (the r, g, or b channel with the highest range)
        int rmin = 255, rmax = 0;
        int gmin = 255, gmax = 0;
        int bmin = 255, bmax = 0;
        for (auto &pixel : pixels) {
            if (pixel.rgb[0] < rmin) rmin = pixel.rgb[0];
            if (pixel.rgb[0] > rmax) rmax = pixel.rgb[0];
            if (pixel.rgb[1] < gmin) gmin = pixel.rgb[1];
            if (pixel.rgb[1] > gmax) gmax = pixel.rgb[1];
            if (pixel.rgb[2] < bmin) bmin = pixel.rgb[2];
            if (pixel.rgb[2] > bmax) bmax = pixel.rgb[2];
        }
        int rrange = rmax - rmin;
        int grange = gmax - gmin;
        int brange = bmax - bmin;
        int dominant = 0;
        if (grange > rrange) dominant = 1;
        if (brange > rrange && brange > grange) dominant = 2;

        // sort pixels by dominant channel
        std::sort(pixels.begin(), pixels.end(), [dominant](const dpixelidx &a, const dpixelidx &b) {
            return a.rgb[dominant] < b.rgb[dominant];
        });

        // get median pixel (middle pixel in sorted list)
        dpixelidx median = pixels[pixels.size() / 2];

        // set all pixels to median pixel
        for (auto &pixel : pixels) {
            pixel.rgb[0] = median.rgb[0];
            pixel.rgb[1] = median.rgb[1];
            pixel.rgb[2] = median.rgb[2];
        }
    }

    // create the new dpixmap
    dpixmap res;
    res.width = pm.width;
    res.height = pm.height;
    res.data = new uint8_t[pm.width * pm.height * 3];

    for (auto &key : ogroup.keys) {
        for (auto &pixel : ogroup.table[key]) {
            // Convert linear pixel index to RGB byte index
            int rgb_idx = pixel.idx * 3;
            res.data[rgb_idx] = pixel.rgb[0];
            res.data[rgb_idx + 1] = pixel.rgb[1];
            res.data[rgb_idx + 2] = pixel.rgb[2];
        }
    }
    // draw black outlines
    for (size_t i = 0; i < circles.size(); ++i) {
        float cx = std::get<0>(circles[i]);
        float cy = std::get<1>(circles[i]);
        float cr = std::get<2>(circles[i]);
        // draw at radius cr + offset
        float rr = cr + 0.0f;
        if (rr <= 0) continue;
        int steps = static_cast<int>(2 * M_PI * rr);
        if (steps < 8) steps = 8;
        for (int s = 0; s < steps; ++s) {
            double theta = s * 2 * M_PI / steps;
            int x = static_cast<int>(std::round(cx + rr * std::cos(theta)));
            int y = static_cast<int>(std::round(cy + rr * std::sin(theta)));
            if (x >= 0 && x < res.width && y >= 0 && y < res.height) {
                int rgb_idx = (y * res.width + x) * 3;
                res.data[rgb_idx] = 0;
                res.data[rgb_idx + 1] = 0;
                res.data[rgb_idx + 2] = 0;
            }
        }
    }
    return res;
}
