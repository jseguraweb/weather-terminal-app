#### Contents

- [Install](#install)
- [Usage](#usage)
- [About](#about)


## Install

```
$ npm install weather-terminal-app
```
Then connect the terminal with the application:
```
$ npm link
```


## Usage

Type ```weather``` followed by a city (*non case-sensitive*). For example:

```
$ weather madrid
```
If the city is unique, the app will display the following current weather information about the inserted place:

    City:            Madrid
    Country:         ES
    Temperature:     12°C
    Max Temp:        16°C
    Min Temp:        9°C
    Humidity:        9%

If there are more than one cities called like the inserted place, the app will display the initials of the different countries where you can find the city:

```
I have found madrid in these countries: ES,CO,MX,PH,US
```

In that case, the user can try a second research by inserting 2 values (city and country initials). Both are non *case-sensitive*:

```
$ madrid es
```

## About

This app fetches data from the API Open Weather Map in a free basic plan. It means that there is a limit of 100 requests/day and 10 requests/minute.
