var express = require("express");
var router = express.Router();

router.post("/superHero/:input", async (req, res) => {
  try {
    const input = req.params.input;
    const possibilities = {
      2: ["a", "b", "c"],
      3: ["d", "e", "f"],
      4: ["g", "h", "i"],
      5: ["j", "k", "l"],
      6: ["m", "n", "o"],
      7: ["p", "q", "r", "s"],
      8: ["t", "u", "v"],
      9: ["w", "x", "y", "z"],
    };
    const results = {};
    const performCobination = (number) => {
      const numerDigitArray = number.toString().split("");
      groupResults(numerDigitArray, 0, numerDigitArray.length, []);
      return results;
    };
    const groupResults = (
      numerDigitArray,
      startingIndex = 0,
      lengthOfNumberDigitArray,
      tempResultsArr
    ) => {
      //base case
      if (tempResultsArr.length === lengthOfNumberDigitArray) {
        // The bounding limit has been reached
        results[tempResultsArr.join("")] = true;
        return;
      }
      const currentNumebr = numerDigitArray[startingIndex];
      const possibilitiesArray = possibilities[currentNumebr];
      for (let letter of possibilitiesArray) {
        //push in temp array
        tempResultsArr.push(letter);
        groupResults(
          numerDigitArray,
          startingIndex + 1,
          lengthOfNumberDigitArray,
          tempResultsArr
        );
        tempResultsArr.pop();
      }
    };
    const finalResult = await performCobination(input);
    const findSuperHero = (results, superHeroList) => {
      for (let hero of superHeroList) {
        if (results[hero.toLowerCase()] === true) {
          return hero;
        }
      }
    };
    const hero = await findSuperHero(finalResult, [
      "SUPERMAN",
      "THOR",
      "ROBIN",
      "IRONMAN",
      "GHOSTRIDER",
      "CAPTAINAMERICA",
      "FLASH",
      "WOLVERINE",
      "BATMAN",
      "HULK",
      "BLADE",
      "PHANTOM",
      "SPIDERMAN",
      "BLACKWIDOW",
      "HELLBOY",
      "PUNISHER",
    ]);
    if (hero) {
      return res.status(200).json({
        hero,
        message: "okay",
      });
    }
    res.send("NO SUEPERHERO OF THIS NUMBER");
  } catch (err) {
    res.send("INVALID INPUT");
  }
});

module.exports = router;
