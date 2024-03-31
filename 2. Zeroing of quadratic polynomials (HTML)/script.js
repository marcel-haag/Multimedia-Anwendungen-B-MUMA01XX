document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn").addEventListener("click", function(){
        var value_a = parseFloat(document.getElementById("value_a").value);
        var value_b = parseFloat(document.getElementById("value_b").value);
        var value_c = parseFloat(document.getElementById("value_c").value);
        var solution;
        var nullstellen = [];
        var node;
        var displaySolution = document.getElementById("solution")

        // Canvas für Grafen
        var canvas = document.getElementById("canvas")
        canvas.width = 600;
        canvas.height = 400;
        document.body.appendChild(canvas);

        var ctx = canvas.getContext("2d");

        // Funktion zum Berechnen der Nullstellen mittels pq-Formel
        var calculateZero = function(a, b, c) {
            // Berechnen von p und q
            var p = b / (2 * a);
            var q = c / a;

            // Berechnen von Diskriminante
            var discriminant = p * p - q;

            // Überprüfen, ob es reale Lösungen gibt
            if (discriminant < 0) {
                return []; // Keine reale Lösung
            } else if (discriminant === 0) {
                // Eine reale Lösung
                return [-p];
            } else {
                // Zwei reale Lösungen
                var sqrtDiscriminant = Math.sqrt(discriminant);
                return [-p - sqrtDiscriminant, -p + sqrtDiscriminant];
            }
        };

        // Funktion zum Zeichnen des Polynoms und seiner Nullstellen
        var drawGraph = function(a, b, c, nullstellen) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Zeichnen der x- und y-Achsen
            ctx.beginPath();
            ctx.moveTo(toCanvasX(-10), toCanvasY(0));
            ctx.lineTo(toCanvasX(10), toCanvasY(0));
            ctx.moveTo(toCanvasX(0), toCanvasY(-10));
            ctx.lineTo(toCanvasX(0), toCanvasY(10));
            ctx.stroke();

            ctx.strokeStyle = "green";

            // Zeichnen des Polynoms
            ctx.beginPath();
            ctx.moveTo(toCanvasX(-10), toCanvasY(a * (-10) ** 2 + b * (-10) + c));
            for (var x = -10; x <= 10; x += 0.1) {
                ctx.lineTo(toCanvasX(x), toCanvasY(a * x ** 2 + b * x + c));
            }
            ctx.stroke();

            ctx.fillStyle = "red";

            if (nullstellen.length === 2) {
                if (nullstellen[0] >= -10 && nullstellen[0] <= 10) {
                    ctx.beginPath();
                    ctx.arc(toCanvasX(nullstellen[0]), toCanvasY(0), 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
                if (nullstellen[1] >= -10 && nullstellen[1] <= 10 && nullstellen[1] !== nullstellen[0]) {
                    ctx.beginPath();
                    ctx.arc(toCanvasX(nullstellen[1]), toCanvasY(0), 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
            } else if (nullstellen.length === 1) {
                if (nullstellen[0] >= -10 && nullstellen[0] <= 10) {
                    ctx.beginPath();
                    ctx.arc(toCanvasX(nullstellen[0]), toCanvasY(0), 5, 0, 2 * Math.PI);
                    ctx.fill();
                }
            } else {
                console.warn("Keine Nullstellen in der Parabel.");
            }
        };

        // Funktion zum Umrechnen von x-Koordinaten in Pixelkoordinaten des Canvas
        var toCanvasX = function(x) {
            return (x + 10) * canvas.width / 20;
        };

        // Funktion zum Umrechnen von y-Koordinaten in Pixelkoordinaten des Canvas
        var toCanvasY = function(y) {
            return canvas.height - (y + 10) * canvas.height / 20;
        };

        if (!isNaN(value_a) && !isNaN(value_b) && !isNaN(value_c)) {
            // Nullstellen berechen
            nullstellen = calculateZero(value_a, value_b, value_c);
            if (nullstellen.length === 2) {
                node = document.createTextNode(
                    "Das Polynom " + value_a + "x² + " + value_b + "x + " + value_c + " hat die Nullstellen x1 = " + nullstellen[0] +", x2 = " + nullstellen[1] + "."
                );
            } else if (nullstellen.length === 1) {
                node = document.createTextNode(
                    "Das Polynom " + value_a + "x² + " + value_b + "x + " + value_c + " hat die Nullstelle x = " + nullstellen[0] + "."
                );
            } else {
                node = document.createTextNode(
                    "Das Polynom " + value_a + "x² + " + value_b + "x + " + value_c + " hat keine reale Lösung."
                );
            }
            // Ergebnis präsentieren
            const para = document.createElement("p");
            para.appendChild(node);
            displaySolution.appendChild(para);
            // Graf präsentieren
            drawGraph(value_a, value_b, value_c, nullstellen);
        } else {
            alert("Bitte valide Zahlen verwenden.")
        }
    })
});