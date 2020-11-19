# [Crypto follow, Chrome Extension](https://tecnella.com/ "Go to Tecnella Group")
-------------------------------------------
## Overview
-------------------------------------------
Is a Chrome extension that allows the visualization of assets, fiat currencies, crypto currencies, among other pairs that vary constantly. It is designed to be displayed at the top of the pages from your browser and to be updated every minute. It can be hidden by double-clicking the bar if necessary.

## The problem
-------------------------------------------
Venezuela is a country in economic crisis and by 2020 has experienced a “Currency Babylonization” which means that +40% of the population use multiple currencies to pay and trade basic supplies like oil, gasoline, Bs. S. (actual Venezuelan coin), USD, EUR, Bra. R, BTC, food, medicines, etc. 

The USD has multiple quotation and exchange rate prices; for example: “Offical USD vs. Bs.S.”, “DolarToday”, “MonitorDolar”. Everyday people need to know the latest price in order to negotiate and minimize losses.

Venezuela’s problem is not enough to satisfy our necessities, but the crypto currency and asset price are of global interest, that’s why we wish to develop a free Chrome Application which will bring a solution to this global need.


## The solution
-------------------------------------------
It was a step by step process:
1. __Create a Chrome extension__ with persistent function. The extension should display a fixed bar at the top of each page.

2. The bar used to have a __hide function__ in case it obstructs the visualization which activated __when mouse over__, but eventually this function was changed.

3. Then came the selection of a __free data vendor__ to fill in and show the pairs at the bar. Those selected were __Binance__ and __Bitfinex__.

4. Read, test and __make requests to the API’s providers__ to get their pair data, then select the data that interests us to throw it on a container and show it was easy using jquery, but when testing the browsing on the web __we realized that many functions were broken__.

5. __The Front End__ or Content Script __must be written only with JavaScript__, without Bootstrap or JQuery, that was easy but when integrating __scraping Functions to get the data from__ vendors like __Venezuela’s Central Bank__ or __Notilogia__ it became a challenge, then we noticed that we could use Jquery on background processes without affecting the Front End.

6. We found __problems with CSS Styles__ on some web pages, so we searched in our code the __class name__ used to find the troublesome one like “Panel” and __change its name to a unique name__ like “Panel-CF”.

7. At this point, the bar was functional, but the pair and number of __elements__ shown was __set by hard code__, we __ought to refactor it to__ make a more __flexible code__, allowing the bar to display a flexible number of elements and make the change of pairs easier. That was another challenge. 

8. The bar shows up a maximum of six elements per line and a minimum of two to make the comparison.

9. We add the "Oil Brend" by __scraping from Investig.com__.

10. At this point we __ought to cut down the long request to web providers__, this was set up to be stored and verified just once.

11. We perceived another utility as “Copy and Paste the Last Value of the Pair”, but the bar was hidden when the mouse was over it. This __function__ was changed to a __double click to hide instead of the mouse over__, which now displays a label with the message “Double Click to Hide”.

12. To make the bar more enjoyable we added a class color when the value gets down (RED) and another when it gets up (GREEN). Additionally, it was added a __temporal background text when the bar updates__.

13. The bar worked well but the configuration was static, that’s a good reason to create a nicer user interface that let select the pair or asset to display. The problem was the providers have more pairs than we expected and show them all was excessive, although possible through __a search box__. 

14. __Through the Development Process we did a lot of testing and fixing__ to the code, but at this point we began to spend time in selecting a license, designing a logo, selecting the colors, improving and cleaning the code, improving the __documentation__, creating a __“READ ME”__ text, creating an __“Installation Guide”__, an __“Usage Manual”__ and fixing some details before launching the solution.

15. Notilogia broken.


## Features
-------------------------------------------
### General features:
* Interface Configuration.
* Search Box to find pairs.
* Auto fix element distribution.
* Local documentation.
* The "Dist code" is optimized with minification and comments free.
* Default Rest Button.

### Visualization of assets like:
* Oil Brend, __"Oil.Brend"__ form Investing.
* Tether Gold vs Tether Dollar, __"tXAUT:USD"__ form Bitfinex.

### Visualization of fiat currencies like:
* Euro vs Tether Dollar, __"EURUSDT"__ from Binances.
* Dollar vs Bolivar, __DolarToDay.VES__ from Bitven (DolarToDay).
* Dollar vs Bolivar, __USD:VES.BCV__ from Venezuela’s Central Bank (Official Rate).

### Visualization of cryptocurrencies like:
#### Binance pairs:
* Bitcoin vs Tether Dollar, __"BTCUSDT"__.
* Etherium vs Bitcoin, __"ETHBTC"__.
* Litecoin vs Bitcoin, __"LTCBTC"__.
* Binance coin vs Bitcoin, __"BNBBTC"__.
* Neo vs Bitcoin, __"NEOBTC"__.
* Etherium vs Tether Dollar, __"ETHUSDT"__.
* Litecoin vs Tether Dollar, __"LTCUSDT"__.
* Cardano (ADA) vs Tether Dollar, __"ADAUSDT"__.
* Binance coin vs Tether Dollar, __"BNBUSDT"__.
* Perlin vs Tether Dollar, __"PERLUSDT"__.
#### Bitfinex pairs:
* Bitcoin vs Tether Dollar, __"tBTCUSD"__.
* Bitcoin vs Tether Dollar, __"tLTCUSD"__.
* Etherium vs Bitcoin, __"tETHBTC"__.
* Litecoin vs Bitcoin, __"tLTCBTC"__.
* Neo vs Bitcoin, __"tNEOBTC"__.
* Etherium vs Tether Dollar, __"tETHUSD"__.
* Litecoin vs Tether Dollar, __"tLTCUSD"__.
* Cardano (ADA) vs Tether Dollar, __"tADAUSD"__.
* Ripple (XRP) vs Tether Dollar, __"tXRPUSD"__.

### Vendors used for get data:
-------------------------------------------
#### Binance: 
The extension gets the data through the [binance-api](https://binance-docs.github.io/apidocs/spot/en/#introduction "Go to binances api introduction" )
#### Bitfinex:
The extension gets the data through the [Bitfinex-api](https://docs.bitfinex.com/docs/introduction "Go to binances api introduction" )
#### Bitven:
The extension gets the data from the web portal [Bitven.com](https://www.bitven.com/2020/09/precio-dolar-paralelo.html "Go to Bitven hitoric price")
#### Investing:
The extension gets the data from the web portal [Es.investing.com](https://es.investing.com/commodities/brent-oil-historical-data "Go to brent-oil-historical-data")
#### Venezuela’s Central Bank:
The extension gets the data from the web portal [bcv.org.ve](http://www.bcv.org.ve/tasas-informativas-sistema-bancario "Go to tasas-informativas-sistema-bancario")

## Installation
-------------------------------------------
You have three options to install the extension, Install from "Chrome Store", Install from "Dist Repository", and Install from "Source-dev Repository".

### Install from the Chrome Store:
1. Open The Chrome Web Store
2. Search “Crypto Follow”
3. Click on “Add to Chrome"
4. Go to "Extension Option" and __pin the extension__

#### Configure on user interface
1. Click the "Pin Icon"
2. Search the pair that interests you and select it.
3. Wait until the bar update (Approximately a minute)

### Install from Release:
Download the "Dist Folder" and open it like developer on Chrome

#### 1. Go to the Last Release and download the Dist Folder [Crypto follow, Github Repository](https://github.com/tecnella-com/crypto-follow "Go to Repository")

#### 2. add the extension to Chrome
1. Open your Chrome browser.
2. Go to "Options", (the three-dot button in the upper right corner)
3. Select __"More Tools" > "Extensions"__
4. In the upper right corner, activate __"Development Mode"__
5. Select the new option __Load Unzipped__
6. Find the Dist Folder (downloaded earlier) and select it.
7. Go to "Extension Option" and __pin the extension__

#### 3. Configure on user interface
1. Click the "Pin Icon"
2. Search the pair that interests you and select it.
3. Wait until the bar update (Approximately a minute)


### Install from Source-dev:
To install you will need to use Gulp to create the Dist Folder and add it to Chrome.

#### 1. Clone or download the Repository. [Crypto follow, Github Repository](https://github.com/tecnella-com/crypto-follow "Go to Repository")
``` 
git clone https://github.com/tecnella-com/crypto-follow.git
```
It should have been download on ":~/$"

#### 2. Create the Dist Folder with gulp
You must have Nodejs installed, check it using in a terminal or console windows: "node -v" to see the version, if you don't have it installed go to (https://nodejs.org/ "Nodejs.org"). Also, you must have Git installed, check it using in a terminal or Windows console: "git --version" to see the version.  if you don't have it installed go to (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git "Install GIT").

Install on ubuntu:
``` 
sudo apt install nodejs
```
move to "The Clone Repository Folder"
``` 
cd crypto-follow-Chrome-extension
```
change "The Active Branch"
``` 
git checkout v1.0.0 (develop)
```
install project dependency to generate the Dist Folder
``` 
npm install
```
In ubuntu you´ll need to do the Gulp-cli install
``` 
sudo npm install --global gulp-cli
```
Execute the "Default Gulp Command"
``` 
gulp
```
Now we've created the Dist Folder

#### 3. add the extension to Chrome
1. Open your Chrome browser.
2. Go to "Options", (the three-dot button in the upper right corner)
3. Select __"More Tools" > "Extensions"__
4. In the upper right corner, activate __"Developer mode"__
5. Select the new option __"Load Unzipped"__
6. Find the Dist Folder (downloaded earlier) and select it.
7. Go to "Extension Option" and __pin the extension__

#### Configure on user interface
1. Click the "Pin Icon"
2. Search the pair that interests you and select it.
3. Wait until the bar update (Approximately a minute)

## Usage
-------------------------------------------
### Documentation
After creating the __"Dist"__ folder, at "./dist/docs/index.html" you will have the code documentation.

#### Configure on user interface
1. Click the "Pin Icon"
2. Search the pair that interests you and select it.
3. Wait until the bar update (Approximately a minute)

## Team
-------------------------------------------
* Salvador Campanella ([salvadorcampanella512@gmail.com](mailto:salvadorcampanella512@gmail.com "send email" )) (chief project engineer)
* Vladimir Cusatti ([vacusattic@gmail.com](mailto:vacusattic@gmail.com "send email" )) (Programming engineer)
* Veronica Duque ([vkdj224@gmail.com](mailto:vkdj224@gmail.com "send email")) (Translator)
## License
-------------------------------------------
```
MIT License

Copyright (c) 2020 TECNELLA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```