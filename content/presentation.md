# Serverless and IoT: Best of Friends!

---

## About Me

![left](~/Dropbox/Profile.jpeg)

* "The Nodebotanist"
* Developer Relations Engineer at IOpipe
* B.S.E. Electrical Engineering student at Arizona State University, holds a B.S. in Computer Science
* Specializes in wearables and education
* From Austin, Texas

---

## What I mean when I say "IoT Device"

An IoT device is any internet-connected device for which a web browser is not the main UI (though it can be connected to the internet through such a device)

Fitness Bands, Watches, Thermostats, Toasters

...Basically anything that isn't a phone/tablet/personal computer

---

## Two Ends of the IoT Architecture Spectrum

1) You have a very limited device that collects raw data and needs to offload it
2) You have a device that is capable of manipulating and storing information but needs to sync with the cloud

---

## How Does Serverless Help in General?

* No need to build out another infrastructure
* Scale out to data centers where your product is going
* Use the HTTP you know and (maybe) love

---

## A Note on JS in Serverless and IoT

As the JS community finds more and more ways to run JS on hardware, and Node.JS is quickly becaming the language of Serverless, I forsee a time when there can be an IoT stack that is JS all the way down. For better or worse.

---

# [fit] Let's take a look at how<br/>IoT and Serverless<br/>Work Together<br/>in the Extremes

---

## Case 1: Limited Micrcontroller

* Embedded device, aiming for size and power consumption over compute power
* Gathers data via sensors, but can't store much or do much with it without harming the power consumption
* Needs to offload data at regular intervals, and react to computed results

---

## Example: Tessel 2 with trackball and LEDs

* Trackball data needs to be uploaded to generate a color
* Serverless function computes color based on trackball data and sends it back
* Microcontroller then lights the LEDs with the computed color ever 5 seconds

---

## Why Serverless Here?

* Instead of having my limited microcontroller compute the color from hue and brightness, I let the Lamda function do that work
* (Color manipulation is also way easier for me in node >.>)
* Microcontroller makes 1 network request 5 seconds after a change is detected (deep sleep mode could be used!)

---

## Example 2: Powerful Microcontroller with Sync

* Small linux-based microcontroller and a keypad
* Device stores votes for purple and orange, and offloads every 5 votes
* eventual consistency across multiple vating devices

---

## Why Serverless Here?

* All I need is a task that will take in votes and send them off to be stored
* Great for bots that have camputing power, but want to lower request overhead

---

## [fit] There are dangers!

---

## Security

* Both IoT and Serverless are new-- meaning we're finding new security issues as we go.
* IoT tends to have bigger issues-- securing hardware is a whole different rodeo

---

## [fit] What's next for IoT and Serverless

---

## AWS Greengrass

* Lambda and AWS tailored for IoT purposes
* Other providers following suit

---

## [fit] a better name for serverless:

# [fit] Skynet.

---

## Thanks for listening!

![inline](~/Dropbox/GIFS/carl-sagan-youre-awesome.gif)

* Kassandra Perch
* Developer Resations Engineer @ IOpipe
* @nodebotanist, the@nodebotani.st