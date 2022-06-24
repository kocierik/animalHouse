
export const getAnimalCodes = async (req, res) => {
  res.json(
    [
      { "code" : 0,
        "value" : "Dog"
      },
      { "code" : 1,
        "value" : "Cat"
      },
      { "code" : 2,
        "value" : "Fox"
      },
      { "code" : 3,
        "value" : "Duck"
      },
      { "code" : 4,
        "value" : "Bunny"
      },
      { "code" : 5,
        "value" : "Koala"
      },
      { "code" : 6,
        "value" : "Panda"
      },
      { "code" : 7,
        "value" : "Shiba"
      },
      { "code" : 8,
        "value" : "Lizard"
      }
    ])
}
