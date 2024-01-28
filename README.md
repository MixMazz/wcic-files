<p align="center">
  <img src="https://github.com/MixMazz/wcic-files/blob/main/frontend/public/header.png" alt="What Can I Catch, header image"/>
</p>

# What Can I Catch?

## [Live Link](https://acnh-whatcanicatch.com)

## [Quick Overview with Pictures](https://fmazzone.com/wcic)

### About


The homepage pulls the critter data from a JSON and the user data (if available) from MongoDB. Parses the critter data and filters out anything that is not available at that current time. If the user has data saved, they can filter out any critters they have already obtained.

The background visuals and animations are SVGs animated with CSS. 

The account page shows the user collections of critters with either a filler icon or an accurate icon, to depict missing and obtained critters respectively.

The account page layout mirrors the in-game screen for ease of use. While making selects, the user can individually select items, select all/clear all, or reset to the most recent save data, before submitting. These selections will affect the data on the homepage.

Originally built this as a mini helper tool for myself, to fill out the in-game museum more efficiently each month. Expanded it to be a full MERN stack tool with additional functionality to be useful for people who are not-myself. 

### Tools used
Frontend
- React
- TypeScript
- Jest/RTL
- Figma
- HTML/CSS

Backend
- TypeScript
- MongoDB
- Express
- Node