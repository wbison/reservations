var Nappkin = (function () {
    function Nappkin(id) {
        this.locationId = parseInt(id);
        this.api = "https://cellarapp.apphb.com/api/v1/";

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
                        reservationObject.isClosedOnDay = function(day) {
                            if (day >= reservationObject.dates.length) return true;
                            var info = reservationObject.dates[day];
                            for(var s = 0; s < info.sections.length; s++) {
                                var section = info.sections[s];
                                if (section.slots && section.slots.length) return false;
                            }
                            return true;
                        };
                        reservationObject.isAvailableOnDay = function(day, pax, slot) {
                            if (day >= reservationObject.dates.length) return false;
                            var info = reservationObject.dates[day];
                            for(var s = 0; s < info.sections.length; s++) {
                                var section = info.sections[s];
                                if (!section.isClosed) {
                                    for (var o = 0; o < section.slots.length; o++) {
                                        if (!slot || slot === section.slots[o].start) {
                                            var available = section.slots[o].available;
                                            if (available >= pax) {
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

        this.createNewReservation = function(reservation, success, failure) {

            if (!failure) {
                failure = function() {};
            }

            if (!this.locationId) {
                failure("Invalid locationId");
                return;
            }

            if (!reservation) {
                failure("Missing reservation");
                return;
            }

            if (!reservation.date || reservation.date < new Date()) {
                failure("Invalid date");
                return;
            }

            if (!reservation.name) {
                failure("Missing name");
                return;
            }

            if (!reservation.email && !reservation.phone) {
                failure("Missing email and phone");
                return;
            }

            if (!reservation.pax || !parseInt(reservation.pax)) {
                failure("Missing number of guests");
                return;
            }

            var r = {
                name: reservation.name,
                email: reservation.email,
                phone: reservation.phone,
                countGuests: parseInt(reservation.pax),
                startsOn: reservation.date.getFullYear() + "-" + (reservation.date.getMonth()+1) + "-" + (reservation.date.getDate()) + "T" + reservation.date.toTimeString().substr(0, 8),
                localTime: true,
                notes: reservation.notes,
                language: reservation.language || 'nl',
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
            xhr.send(JSON.stringify(r));
        }
    }
    return Nappkin;
})();
