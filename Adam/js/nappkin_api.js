/**
 * Created by wbison on 15-10-15.
 */
var Nappkin = (function () {
    function Nappkin(id) {
        this.locationId = parseInt(id);
        this.api = "https://devcellarapp.apphb.com/api/v1/";

        this.getAvailabilityForMonth = function(date, success, failure) {

            if (!failure) {
                failure = function() {};
            }

            if (!this.locationId) {
                failure("Invalid locationId");
                return;
            }

            var year = date.getFullYear();
            if (year < 2015 || year > 2100) {
                failure("Invalid year");
                return;
            }
            var month = date.getMonth();

            var xhr = new XMLHttpRequest();
            var end = new Date(year, month+1, 0, 12);
            var s = year + "-" + (month+1) + "-" + 1;
            var e = year + "-" + (month+1) + "-" + end.getDate();
            var url = this.api + "reservationslotext?from=" + s + "&to=" + e + "&locationId=" + this.locationId;
            xhr.open('GET', encodeURI(url));
            xhr.onload = function() {
                if (xhr.status === 200) {
                    if (success) {
                        var reservationObject = JSON.parse(xhr.responseText).result;
                        reservationObject.isClosed = function(day) {
                            if (day >= reservationObject.dates.length) return true;
                            var info = reservationObject.dates[day];
                            for(var s = 0; s < info.sections.length; s++) {
                                var section = info.sections[s];
                                if (section.slots && section.slots.length) return false;
                            }
                            return true;
                        };
                        reservationObject.isAvailable = function(day, slot) {
                            if (day >= reservationObject.dates.length) return false;
                            var info = reservationObject.dates[day];
                            for(var s = 0; s < info.sections.length; s++) {
                                var section = info.sections[s];
                                if (!section.isClosed) {
                                    for (var o = 0; o < section.slots.length; o++) {
                                        if (!slot || slot === section.slots[o].start) {
                                            if (section.slots[o].available > 0) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                            }
                            return false;
                        };
                        success(reservationObject);
                    }
                }
                else {
                    failure(xhr.status);
                }
            };
            xhr.send();
        }

        this.createNewReservation = function(date, pax, name, email, phone, notes, language, success, failure) {

            if (!failure) {
                failure = function() {};
            }

            if (!this.locationId) {
                failure("Invalid locationId");
                return;
            }

            if (!date || date < new Date()) {
                failure("Invalid date");
                return;
            }

            if (!name) {
                failure("Missing name");
                return;
            }

            if (!pax || !parseInt(pax)) {
                failure("Missing number of guests");
                return;
            }

            var reservation = {
                name: name,
                email: email,
                phone: phone,
                countGuests: parseInt(pax),
                startsOn: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()) + "T" + date.toTimeString().substr(0, 8),
                localTime: true,
                notes: notes,
                language: language || 'nl',
                source: 0,
                locationId: this.locationId
            };

            var xhr = new XMLHttpRequest();
            var url = this.api + "reservation";
            xhr.open('POST', encodeURI(url));
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (success) {
                        success(xhr.responseText);
                    }
                }
                else {
                    failure(xhr.status);
                }
            };
            xhr.send(JSON.stringify(reservation));
        }
    }
    return Nappkin;
})();


//var nappkin = new Nappkin(193);
//var date = new Date(2015, 9, 1);
//var x = nappkin.getAvailabilityForMonth(date, function(data) {
//    alert(data);
//});
//
//var z = nappkin.createNewReservation(new Date(2015,9,17, 20), 2, "wim", "email@name.com", "06", "veggie", "nl", function(res) {
//    alert(res);
//}, function(err) {
//    alert(err);
//});
