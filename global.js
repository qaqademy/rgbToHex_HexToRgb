function parseHTMLColor(c) {
    if (c[0] !== "#") {
        c = "#" + c;
    }
    return {
        "r": +parseInt(c.length == 7 ? c.substring(1, 3) : c.substring(1, 2).repeat(2), 16).toString(10),
        "g": +parseInt(c.length == 7 ? c.substring(3, 5) : c.substring(2, 3).repeat(2), 16).toString(10),
        "b": +parseInt(c.length == 7 ? c.substring(5, 7) : c.substring(3, 4).repeat(2), 16).toString(10)
    }
}
function decimalToHex(val) {
    var nr = val.split(",");
    var r = (+nr[0]).toString(16);
    var g = (+nr[1]).toString(16);
    var b = (+nr[2]).toString(16);
    console.log(r, g, b);
    return "#" + (r.length > 1 ? r : "0" + r) + (g.length > 1 ? g : "0" + g) + (b.length > 1 ? b : "0" + b);
}
var randomHex = ()=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"][(Math.random() * 15) | 0];
var hexInputField = document.getElementById('hex');
var rgbInputField = document.getElementById('rgb');
const searchInput = [...document.querySelectorAll('.js-input')];
const displayColor = function () {
    var val = this.value;
    if (this.getAttribute('id') == "hex") {
        if (val[0] !== "#") {
            val = "#" + val;
        }
        if (val.length == 4 || val.length == 7) {
            if (val.match(/((^#)?(([0-9a-f]){6}|([0-9a-f]){3}))/i)) {
                var colors = parseHTMLColor(val);
                document.body.style.background = 'rgb(' + colors.r + ',' + colors.g + ',' + colors.b + ')';
                rgbInputField.value = colors.r + ',' + colors.g + ',' + colors.b;
                if (colors.r + +colors.g + +colors.b < 350) {
                    if (!document.body.classList.contains("white")) {
                        document.body.classList.add("white");
                    }
                } else {
                    if (document.body.classList.contains("white")) {
                        document.body.classList.remove("white")
                    }
                }
            }
        } else {
            document.body.style.background = '#176';
            rgbInputField.value = "";
            if (document.body.classList.contains("white")) {
                document.body.classList.remove("white")
            }
        }
    } else {
        //rgb converter
        if (val.match(/,/) && val.match(/,/g).length == 2 && val.match(/\d$/)) {
            var splitVal = val.split(",");
            if (splitVal[0] > -1 && splitVal[0] < 256 && splitVal[1] > -1 && splitVal[1] < 256 && splitVal[2] > -1 && splitVal[2] < 256) {
                document.body.style.background = decimalToHex(val);
                hexInputField.value = decimalToHex(val);
                if (splitVal[0] + +splitVal[1] + +splitVal[2] < 350) {
                    if (!document.body.classList.contains("white")) {
                        document.body.classList.add("white");
                    }
                } else {
                    if (document.body.classList.contains("white")) {
                        document.body.classList.remove("white")
                    }
                }
            }
        } else {
            document.body.style.background = '#176';
            if (document.body.classList.contains("white")) {
                document.body.classList.remove("white")
            }
        }
    }
};

searchInput.map(el => el.addEventListener("keyup", displayColor));
searchInput.map(el => el.addEventListener("change", displayColor));
//random code generator
var generateColors = function (e) {
    if (e.keyCode == 32 || e.keyCode == 13) {
        document.querySelector('.intro-msg-js').classList.add("hide");
        var newColor = "#" + (new Array(6).fill(0)).map(el=>randomHex()).join``;
        document.body.style.background = newColor;
        document.getElementById('generator-wrapper').innerHTML += `
                            <div class="box" style="background-color:${newColor}">
                            <div class="color-code">${newColor}</div>
                        </div>`;
    }
};
var optionList = [...document.querySelectorAll('.menu li')];
var changePageContent = function () {
    if (this.getAttribute("class") == "converter") {
        document.getElementById('converter-wrapper').classList.remove("hide");
        document.getElementById('generator-wrapper').classList.add("hide");
        document.body.removeEventListener("keyup", generateColors);
    }
    if (this.getAttribute("class") == "random") {
        document.body.addEventListener("keyup", generateColors);
        document.getElementById('generator-wrapper').classList.remove("hide");
        document.getElementById('converter-wrapper').classList.add("hide");
    }
};
optionList.map(el=>el.addEventListener("click", changePageContent));
