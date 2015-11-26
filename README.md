# Algemeen
Je kunt op verschillende manieren op je eigen website reserveringen aanmaken in Nappkin. Als je WordPress gebruikt kun je de Nappkin reserveer plugin installeren. Dat is de makkelijkste manier.
Als je je website in eigen beheer hebt en volledige controle wilt over het uiterlijk van de reserveerpagina of -sectie dan kan je als basis het script `js/nappkin_api.js` gebruiken. 
  Tot slot kan je de voorbeeld implementatie overnemen en die naar je wensen aanpassen, bijv qua kleur en lettertype.  

# Api 
Het script `js/nappkin_api.js` bevat de basiscode die nodig is voor de communicatie met de Nappkin server. Om de code te gebruiken instantieer je het Nappkin object als volgt:
```javascript
var locationId = 2;
var nappkin = new Nappkin(locationId);
nappkin.GetAvailablityForMonth(Date date, success, failure);
```

Het object 'Nappkin' bevat twee functies:

```javascript
nappkin.GetAvailablityForMonth(Date date, success, failure);
```

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

index.html is een referentie implementatie die gebruik maakt van js/nappkin_api.js.
Je kunt dit bestand en de inhoud van js/ en css/ overnemen op je website.

# WordPress
Installatie instructie
- installeer de plugin 'amr shortcode any widget'
Met deze plugin kun je widgets opnemen in een pagina
- maak een zip van WordPress/
- in WordPress: 'Add new plugin'
- upload de zip
- ga naar 'Appearance widgets'
- sleep de Nappkin plugin naar het panel 'Widgets for Shortcodes'
[img]
- vul het id in dat je van Nappkin hebt ontvangen
- maak een nieuwe pagina aan en neem daarin de code `[do_widget nappkin]` op