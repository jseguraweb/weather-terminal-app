#!/usr/bin/env node

require('dotenv').config()
const apiHost = process.env.API_HOST
const apiKey = process.env.API_KEY

const args = process.argv.slice(2)
const chalk = require('chalk');
const fetch = require('node-fetch')

const toCelsius = kelvin => Math.round(kelvin - 273.15)
const formatString = string => string.trim().replace(/\s+/g, ' ').toLocaleLowerCase()
const capitalizeInitial = string => string.split(' ').map(word => word.charAt(0).toLocaleUpperCase().concat(word.substring(1).toLocaleLowerCase())).join(' ')

const fetchData = async (arg1, arg2) => {

    let city = formatString(arg1);
    let country;

    try {

        const response = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?type=link%252C%20accurate&units=imperial%252C%20metric&q=${city}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": apiHost,
                "x-rapidapi-key": apiKey
            }
        });

        const data = await response.json();

        if (data.count === 1) {

            const stats = data.list.map(city => [city.name, Object.values(city.sys)[0], toCelsius(city.main.temp), toCelsius(city.main.feels_like), toCelsius(city.main.temp_max), toCelsius(city.main.temp_min), city.main.humidity]).find(property => property)

            const state = stats[0]
            const nation = stats[1]
            const temp = stats[2]
            const minTemp = stats[3]
            const maxTemp = stats[4]
            const hum = stats[5]

            console.log(`
                    ${chalk.hex('#c7c7c7')('City:')}            ${chalk.yellow(state)}
                    ${chalk.hex('#c7c7c7')('Country:')}         ${chalk.hex('#d17f21')(nation)}
                    ${chalk.hex('#c7c7c7')('Temperature:')}     ${temp <= 0 ? chalk.cyan(`${temp}°C`) : temp <= 25 ? chalk.green(`${temp}°C`) : chalk.red(`${temp}°C`)}
                    ${chalk.hex('#c7c7c7')('Max Temp:')}        ${maxTemp <= 0 ? chalk.cyan(`${maxTemp}°C`) : maxTemp <= 25 ? chalk.green(`${maxTemp}°C`) : chalk.red(`${maxTemp}°C`)}
                    ${chalk.hex('#c7c7c7')('Min Temp:')}        ${minTemp <= 0 ? chalk.cyan(`${minTemp}°C`) : minTemp <= 25 ? chalk.green(`${minTemp}°C`) : chalk.red(`${minTemp}°C`)}
                    ${chalk.hex('#c7c7c7')('Humidity:')}        ${chalk.hex('#aa6de8')(`${hum}%`)}
                `);

        } else if (data.count > 1) {

            if (arg2) {

                country = arg2.toLocaleUpperCase()
                const stats = data.list.map(city => Object.values(city.sys)[0] === country && [city.name, Object.values(city.sys)[0], toCelsius(city.main.temp), toCelsius(city.main.feels_like), toCelsius(city.main.temp_max), toCelsius(city.main.temp_min), city.main.humidity]).find(property => property)

                const state = stats[0]
                const nation = stats[1]
                const temp = stats[2]
                const minTemp = stats[3]
                const maxTemp = stats[4]
                const hum = stats[5]

                console.log(`
                    ${chalk.hex('#c7c7c7')('City:')}            ${chalk.yellow(state)}
                    ${chalk.hex('#c7c7c7')('Country:')}         ${chalk.hex('#d17f21')(nation)}
                    ${chalk.hex('#c7c7c7')('Temperature:')}     ${temp <= 0 ? chalk.cyan(`${temp}°C`) : temp <= 25 ? chalk.green(`${temp}°C`) : chalk.red(`${temp}°C`)}
                    ${chalk.hex('#c7c7c7')('Max Temp:')}        ${maxTemp <= 0 ? chalk.cyan(`${maxTemp}°C`) : maxTemp <= 25 ? chalk.green(`${maxTemp}°C`) : chalk.red(`${maxTemp}°C`)}
                    ${chalk.hex('#c7c7c7')('Min Temp:')}        ${minTemp <= 0 ? chalk.cyan(`${minTemp}°C`) : minTemp <= 25 ? chalk.green(`${minTemp}°C`) : chalk.red(`${minTemp}°C`)}
                    ${chalk.hex('#c7c7c7')('Humidity:')}        ${chalk.hex('#aa6de8')(`${hum}%`)}
                `);

            } else {

                const arrayOfArrays = data.list.map(city => Object.values(city.sys))
                const arrayOfCountries = arrayOfArrays.map(el => el.toString())
                const countriesFound = arrayOfCountries.filter((item, i) => arrayOfCountries.indexOf(item) === i)

                console.log(`
                            I have found ${capitalizeInitial(city)} in these countries: ${countriesFound}
                        `);

            }

        } else {

            console.log(`Sorry, I can't find ${capitalizeInitial(city)}`)

        }

    } catch (error) {

        console.log(error);

    }
}

fetchData(...args)