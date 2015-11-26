# reservations

# Algemeen

# Api 
js/nappkin.js

var locationId = 2;
var api = new Nappkin(locationId);
api.GetAvailablityForMonth(Date date, success, failure);

```
{"result":
    {"dates":
        [
            {
            "date":"2015-11-01",
            "sections":
                [
                    {
                    "start":"12:00",
                    "name":"Lunch",
                    "countGuests":0,
                    "slots":
                        [
                            {
                            "start":"12:00",
                            "available":50
                            },
                            {
                            "start":"12:30",
                            "available":50
                            }
                         ]
                    },
                    {
                    "start":"18:00",
                    "name":"Dinner",
                    "countGuests":0,
                    "slots":
                        [
                            {
                            "start":"18:00",
                            "available":50
                            }
                        ]
                    }
                ]
            }
        ],
        "maxGroupSize":6
    }
}
```

# Html 

# WordPress