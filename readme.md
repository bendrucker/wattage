# wattage [![Build Status](https://travis-ci.org/bendrucker/wattage.svg?branch=master)](https://travis-ci.org/bendrucker/wattage) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/wattage.svg)](https://greenkeeper.io/)

> Browser app for analyzing activity videos using fit/gpx data

## Project

If you record video and use a tracking device while running, biking, or driving, you can link up the data and overlay metrics over your video. [Dashware](http://www.dashware.net/) or [Garmin VIRB Edit](http://www.garmin.com/en-US/shop/downloads/virb-edit) provide GUIs for editing videos and then lossily rendering out an MP4. I thought it would be interesting to try to create a dynamically rendered shareable video so things like metrics and maps were customizable at play time and old videos would improve with the software.

## Prototype

I want to take a video from my GoPro HERO4 Silver and link raw data from the `.fit` file my Garmin 810 produces.

Initially I just want to have pure text and then try graphical gauges later. I should be able to display:

* Speed
* Power
* Cadence
* Heart Rate

These values don't need to appear visually over the video. The proof of concept can be an HTML table. The result should be accurate but ugly. That means I need to find some way to resolve time offsets between the video and the sensor data. Ideally the clocks in the camera and bike computer would be synchronized and this offset would be `0`. For right now a text input is acceptable.

## Ideas

- [ ] Display a map bound to the current position
  - [ ] Changing the time in the video moves the map pin
  - [ ] Moving the map pin changes the video time
- [ ] Display segment data from [Strava](https://strava.com)
