db.createUser(
  {
    user: "AnimalHouse",
    pwd: "animal",
    roles : [
      {
        role: "readWrite",
        db : "animal-house-db"
      }
    ]
  }
)
