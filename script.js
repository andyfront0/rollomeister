//---------------------------START-----------------------------

//Get elements
const modelViewer = document.querySelector('#rollomeister');
const modelViewer_room = document.querySelector('#room_scene');
const checkbox = document.querySelector('#zeige-masse');
const checkboxcontainer = document.getElementsByClassName('checkboxcontainer')[0];
const breite = document.getElementById('breite');
const hoehe = document.getElementById('hoehe');
const menuButton = document.getElementById("hamburger");
const stoffe = document.getElementById("stoffe");
const stoffe_2 = document.getElementById("stoffe_2");
const breite_label = document.getElementById("breite_label");
const hoehe_label = document.getElementById("hoehe_label");
const productButton = document.getElementById("productButton");
const slidesParent = document.getElementsByClassName("slideProdukt");
const produktName = document.getElementById("produktname");
var minBreite; var maxBreite; var minHoehe; var maxHoehe;
var materialSlot; var material2Slot; var materialSlot_room; var material2Slot_room;
var texture; var texture_2;
var material; var material_room; var material_2; var material_room_2;

// 3 verschiedene Kamera einstellungen für Rollo, Markise, Senkrechtmarkisen
var cameraTargetArray = ["0.25m 1m 0.25m", "0m 2m -1.5m", "0m 1m -0.75m"];
var cameraOrbitArray = ["-40deg 87deg 4m", "138.5deg 80.93deg 4m", "138.5deg 80.93deg 4m"];

//Check if file exists
function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    if (xhr.status == "404") {return false;} else {return true;}
}

//Make height = width to productButton Element
$(document).ready(function () {
    $(".slide").css("height", productButton.offsetWidth + 'px');
});

//Scrolling buttons (Raumansicht / Konfigurator)
$(".scroll-down").click(function () { animateScrollDown(); if (menuButton.checked) { menuButton.click(); } });
$(".scroll-up").click(function () { animateScrollUp(); });

//Produkte Contructor
function Product(name, category, minBreite, maxBreite, minHoehe, maxHoehe, disabledMenu, whichEnvironment, cameraSettings) {
    this.name = name;
    this.category = category;
    this.minBreite = minBreite;
    this.maxBreite = maxBreite;
    this.minHoehe = minHoehe;
    this.maxHoehe = maxHoehe;
    this.disabledMenu = disabledMenu;
    this.whichEnvironment = whichEnvironment;
    this.cameraSettings = cameraSettings;
}

//Produkte Liste
//Categories: Plissee, Rollo, Innenjalousie, Markise, Senkrechtmarkise, Lamellen
var productArray = [
    new Product("VS2 Slide Comfort", 0, 23, 180, 20, 220, 0, 0, 0),
    new Product("Standardrollo (mit Kassette)", 1, 50, 300, 30, 320, 0, 0, 0),
    new Product("VSZ_rund", 4, 0, 0, 0, 0, 1, 1, 2),
    new Product("VS2", 0, 20, 150, 30, 220, 0, 0, 0),
    new Product("Basic", 3, 0, 0, 0, 0, 1, 1, 1),
    new Product("Sonnentraum", 3, 0, 0, 0, 0, 1, 1, 1),
    new Product("Elegance", 3, 0, 0, 0, 0, 1, 1, 1),
    new Product("Gold XXL", 3, 0, 0, 0, 0, 1, 1, 1),
    new Product("Gold", 3, 0, 0, 0, 0, 1, 1, 1),
    new Product("Silver", 3, 0, 0, 0, 0, 1, 1, 1),
    new Product("VS_Cable_eckig", 4, 0, 0, 0, 0, 1, 1, 2),
    new Product("VS_Cable_rund", 4, 0, 0, 0, 0, 1, 1, 2),
    new Product("VS_eckig", 4, 0, 0, 0, 0, 1, 1, 2),
    new Product("VS_rund", 4, 0, 0, 0, 0, 1, 1, 2),
    new Product("VSZ_eckig", 4, 0, 0, 0, 0, 1, 1, 2),
    new Product("8000 Standardjalousie (Schnurzug_Wendestab)", 2, 0, 0, 0, 0, 1, 0, 0),
    new Product("8100 Monokommando (Kette, Kurbel oder Motor)", 2, 0, 0, 0, 0, 1, 0, 0),
    new Product("8500 Glasleistenjalousie Style", 2, 0, 0, 0, 0, 1, 0, 0),
    new Product("8700 Verspannte Jalousie Duoflex", 2, 0, 0, 0, 0, 1, 0, 0),
    new Product("8780 Verspannte Jalousie Duoflex Slide KL zum Kleben ohne Bohren", 2, 0, 0, 0, 0, 1, 0, 0),
    new Product("Standardrollo (optional mit Kassette)", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Standardrollo mit Trägerprofil", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("89 mm", 5, 0, 0, 0, 0, 1, 0, 0),
    new Product("127 mm", 5, 0, 0, 0, 0, 1, 0, 0),
    new Product("Dachfenster genormt (Velux, Roto, Braas, etc.)", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Dachfenster Komfort", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("DF 10", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("DF 20", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("DF 30", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("DF Comfort 10", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("DF Comfort 20", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("DF Comfort 30", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("Doppelrollo Classic", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Doppelrollo Premium", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Elektromotor 230 Volt von Rademacher", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("F Slope 2", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("F1", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("F3", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("F4", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("FD Slope 3", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("FD Slope 4", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("FE", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("Federzug-Softrollo", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Giebelfenster (Dreieck)", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Giebelfenster (Trapez)", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Glasleistenrollo", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("Komfortrollo", 1, 0, 0, 0, 0, 1, 0, 0),
    new Product("PL 11", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("PLE 12", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("PLK 13", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("SR 1 S", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("SR 1", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("SR 2", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("VS1", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("VS3", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("VS4", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("VS5", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("VS6", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("VS7", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("VS8", 0, 0, 0, 0, 0, 1, 0, 0),
    new Product("Dachfenster", 2, 0, 0, 0, 0, 1, 0, 0),
    new Product("Giebelfenster Jalousien", 2, 0, 0, 0, 0, 1, 0, 0),
    new Product("Giebelfenster Lamellen", 5, 0, 0, 0, 0, 1, 0, 0),
    new Product("Senkrechte, rechteckige Fenster und Türen", 5, 0, 0, 0, 0, 1, 0, 0),
    new Product("Wavelines (gegenläufig)", 5, 0, 0, 0, 0, 1, 0, 0),
    new Product("Wavelines (gleichläufig)", 5, 0, 0, 0, 0, 1, 0, 0)];

//Load products into menu
for (var i = 1; i < productArray.length; i++) {
    var newItem = productButton.cloneNode(true);
    slidesParent[productArray[i].category].appendChild(newItem);
    newItem.setAttribute("class", "slide");
    newItem.setAttribute("onclick", "switchSrc(" + i + ",this,'" + productArray[i].name + "')");
    newItem.style = "background-image: url('models/products/" + productArray[i].name + ".jpg');";
}

//Nur das erste Element, weil das nicht gecloned werden muss
productButton.setAttribute("onclick", "switchSrc(" + 0 + ",this,'" + productArray[0].name + "')");
productButton.style = "background-image: url('models/products/" + productArray[0].name + ".jpg');";

//Load everything
modelViewer.addEventListener('load', () => {
    loadEvents();
    loadSettings();
    loadHotspots();
    loadMaterial();
    loadAnimation();
    loadStoffe();
});

modelViewer_room.addEventListener('load', () => {
    loadMaterialRoom();
});
//-------------------------START END---------------------------


//Load Events
//---------------------------------------------------------------------------------------------------
function loadEvents() {

    //Checkbox Zeige Maße function
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').classList.remove('hide');
            modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').classList.remove('hide');
            modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').classList.remove('hide');
        } else {
            modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').classList.add('hide');
            modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').classList.add('hide');
            modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').classList.add('hide');
        }
    });

    //When changing sliders, do this
    breite.addEventListener("input", function () { onSliderChange(breite.value, hoehe.value); breite_label.innerHTML = "Breite - " + breite.value + "cm"; });
    hoehe.addEventListener("input", function () { onSliderChange(breite.value, hoehe.value); hoehe_label.innerHTML = "Höhe - " + hoehe.value + "cm"; });
    breite.addEventListener('mouseup', function () { breite_label.innerHTML = "Breite"; });
    hoehe.addEventListener('mouseup', function () { hoehe_label.innerHTML = "Höhe"; });
    breite.addEventListener('touchend', function () { breite_label.innerHTML = "Breite"; });
    hoehe.addEventListener('touchend', function () { hoehe_label.innerHTML = "Höhe"; });

    //Adds changing product functionality
    window.switchSrc = (i, element, name) => {
        const base = "models/products/" + name;
        modelViewer.src = base + '.glb';
        //Apply Environment
        var roomPath = "models/rooms/" + name + ".glb";
        if (doesFileExist(roomPath)) {
            modelViewer_room.src = roomPath;
            //Activate scrolling up and down buttons
            $(".scroll-down").css("visibility", "visible");
            $(".scroll-up").css("visibility", "visible");
        } else {
            //Deactivate scrolling up and down buttons
            $(".scroll-down").css("visibility", "hidden");
            $(".scroll-up").css("visibility", "hidden");
        }

        //Apply Kameraeinstellungen
        modelViewer_room.cameraTarget = cameraTargetArray[productArray[i].cameraSettings];
        modelViewer_room.cameraOrbit = cameraOrbitArray[productArray[i].cameraSettings];
        produktname.textContent = name;
        const slides = document.querySelectorAll(".slide");
        slides.forEach((element) => { element.classList.remove("selected"); });
        element.classList.add("selected");
    };

    document.querySelector(".slideProdukt").addEventListener('beforexrselect', (ev) => {
        // Keep slider interactions from affecting the XR scene.
        ev.preventDefault();
    });
}
//---------------------------------------------------------------------------------------------------



//Load Hotspots
//----------------------------------------------------------------------------
function loadHotspots() {
    const center = modelViewer.getCameraTarget();
    const size = modelViewer.getDimensions();
    const x2 = breite.value / 100 / 2;
    const y2 = hoehe.value / 100 / 2;
    const z2 = size.z / 2;

    modelViewer.updateHotspot({
        name: 'hotspot-dim+X-Z',
        position: `${center.x + x2} ${center.y} ${center.z - z2}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim+X-Z"]').textContent =
        `${(hoehe.value * 1).toFixed(0)} cm`;

    modelViewer.updateHotspot({
        name: 'hotspot-dim+Y-Z',
        position: `${center.x} ${center.y + y2} ${center.z - z2}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent =
        `${(breite.value * 1).toFixed(0)} cm`;

    modelViewer.updateHotspot({
        name: 'hotspot-dim-X-Z',
        position: `${center.x - x2} ${center.y} ${center.z - z2}`
    });
    modelViewer.querySelector('button[slot="hotspot-dim-X-Z"]').textContent =
        `${(hoehe.value * 1).toFixed(0)} cm`;
}
//----------------------------------------------------------------------------



//Load Settings
//---------------------------------------------------------------------------------------------------
function loadSettings() {

    //Min und Max Breite und Hoehe der Produkte
    for (var i = 0; i < productArray.length; i++) {
        if (modelViewer.src == "models/products/" + productArray[i].name + ".glb") {

            breite.disabled = productArray[i].disabledMenu;
            hoehe.disabled = productArray[i].disabledMenu;
            checkbox.checked = !productArray[i].disabledMenu;
            if (productArray[i].disabledMenu) {
                checkboxcontainer.style.opacity = "0.5";
                breite.style.opacity = "0.5";
                hoehe.style.opacity = "0.5";
            } else {
                checkboxcontainer.style.opacity = "1";
                breite.style.opacity = "1";
                hoehe.style.opacity = "1";
            }
            
            //Run Checkbox "change" event to show / hide Maße
            var event = new Event('change');
            checkbox.dispatchEvent(event);

            if (productArray[i].disabledMenu == 0) {
                minBreite = productArray[i].minBreite;
                maxBreite = productArray[i].maxBreite;
                minHoehe = productArray[i].minHoehe;
                maxHoehe = productArray[i].maxHoehe;
            }
        }
    }

    //Change min and max for sliders for each product
    breite.setAttribute("min", minBreite);
    breite.setAttribute("max", maxBreite);
    hoehe.setAttribute("min", minHoehe);
    hoehe.setAttribute("max", maxHoehe);

    //Falls was zu groß oder zu klein ist, anpassen!
    if (breite.value < minBreite) { breite.value = minBreite; }
    if (breite.value > maxBreite) { breite.value = maxBreite; }
    if (hoehe.value < minHoehe) { hoehe.value = minHoehe; }
    if (hoehe.value > maxHoehe) { hoehe.value = maxHoehe; }
}
//---------------------------------------------------------------------------------------------------



//Load Material
//---------------------------------------------------------------------------------------
const createAndApplyTexture = async (channel) => {
    texture = await modelViewer.createTexture(document.querySelector('#stoffe').value);
    material.pbrMetallicRoughness[channel].setTexture(texture);

    if (material2Slot != -1) {
        texture_2 = await modelViewer.createTexture(document.querySelector('#stoffe_2').value);
        material_2.pbrMetallicRoughness[channel].setTexture(texture_2);
    }
}

function loadMaterial() {

    //Check for material Slot
    materialSlot = modelViewer.model.materials.findIndex(object => {
        return object.name === 'Stoff_01';
    });

    //Check for material_2 Slot
    material2Slot = modelViewer.model.materials.findIndex(object => {
        return object.name === 'Stoff_02';
    });

    material = modelViewer.model.materials[materialSlot];

    if (material2Slot != -1) {
        material_2 = modelViewer.model.materials[material2Slot];
        stoffe_2.disabled = false;
    } else {
        stoffe_2.disabled = true;
    }

    //On change Stoff
    document.querySelector('#stoffe').addEventListener('input', (event) => {
        createAndApplyTexture('baseColorTexture');
    });

    //On change Stoff 2
    document.querySelector('#stoffe_2').addEventListener('input', (event) => {
        createAndApplyTexture('baseColorTexture');
    });
}
//---------------------------------------------------------------------------------------


//Load Material Room
//---------------------------------------------------------------------------------------
const createAndApplyTexture_room = async (channel) => {
    texture = await modelViewer.createTexture(document.querySelector('#stoffe').value);
    material_room.pbrMetallicRoughness[channel].setTexture(texture);

    if (material2Slot_room != -1) {
        texture_2 = await modelViewer.createTexture(document.querySelector('#stoffe_2').value);
        material_room_2.pbrMetallicRoughness[channel].setTexture(texture_2);
    }
}

function loadMaterialRoom() {

    //Check for material Slot
    materialSlot_room = modelViewer_room.model.materials.findIndex(object => {
        return object.name === 'Stoff_01';
    });

    //Check for material_2 Slot
    material2Slot_room = modelViewer_room.model.materials.findIndex(object => {
        return object.name === 'Stoff_02';
    });

    material_room = modelViewer_room.model.materials[materialSlot_room];

    if (material2Slot_room != -1) {
        material_room_2 = modelViewer_room.model.materials[material2Slot_room];
    }

    //Direct load texture
    createAndApplyTexture_room('baseColorTexture');

    //On change Stoff
    document.querySelector('#stoffe').addEventListener('input', (event) => {
        createAndApplyTexture_room('baseColorTexture');
    });

    //On change Stoff
    document.querySelector('#stoffe_2').addEventListener('input', (event) => {
        createAndApplyTexture_room('baseColorTexture');
    });
}
//---------------------------------------------------------------------------------------



//Load Animation
//-----------------------------------------------------
function loadAnimation() {
    modelViewer.currentTime = getTimeOfAnim(breite.value, hoehe.value);
    modelViewer.pause();
    modelViewer.updateFraming();
}
//-----------------------------------------------------



//Load Stoffe
//---------------------------------------------------------------------------------------------------------
function loadStoffe() {

    //Lösche alle vorherigen Stoffe aus Liste
    while (stoffe.firstChild) {
        stoffe.removeChild(stoffe.lastChild);
        stoffe_2.removeChild(stoffe_2.lastChild);
    }

    var stoffe_orange = ["20239_Plissiert.png"];
    var stoffe_blau = ["10015_Flaeche.png", "10126_Plissiert.png", "10127_Plissiert.png"];
    var stoffe_gelb = ["10009_Flaeche.png", "10125_Plissiert.png", "10222_Plissiert.png"];
    var stoffe_rot = ["10002_Flaeche_Cara.png", "10124_Plissiert.png", "10225_Plissiert.png"];
    var stoffe_weiss = ["10003_Flaeche.png", "10017_Plissiert.png", "10101_Flaeche.png"];
    var stoffe_array = [stoffe_orange, stoffe_blau, stoffe_gelb, stoffe_rot, stoffe_weiss];
    var stoffe_colors = ["orange", "blau", "gelb", "rot", "weiss"];

    for (var i = 0; i < stoffe_array.length; i++) {
        for (var j = 0; j < stoffe_array[i].length; j++) {
            var option = document.createElement("option");
            option.value = "stoffe/" + stoffe_colors[i] + "/" + stoffe_array[i][j];
            var text = document.createTextNode(stoffe_colors[i] + " - " + stoffe_array[i][j].replace(".png", ""));
            option.appendChild(text);
            stoffe.appendChild(option);
            var option_2 = option.cloneNode(true);
            stoffe_2.appendChild(option_2);
        }
    }
}
//---------------------------------------------------------------------------------------------------------




//Get keyframe time for animation in .glb for breite + hoehe
//----------------------------------------------------------------------------------
function getTimeOfAnim(breite, hoehe) {
    var fps = 25.00;
    var stepBreite = maxBreite - minBreite + 1;
    var stepHoehe = maxHoehe - minHoehe;

    var time = (((hoehe - minHoehe) * stepBreite) + (breite - minBreite)) / fps;
    return time;
}
//----------------------------------------------------------------------------------


//When changing values for breite / höhe sliders
//----------------------------------------------------------
function onSliderChange(breite, hoehe) {
    modelViewer.currentTime = getTimeOfAnim(breite, hoehe);
    modelViewer.pause();
    modelViewer.updateFraming();
    loadHotspots();
}
//----------------------------------------------------------


//Room controls
//-----------------------------------------------------------------------------------------------
const tapDistance = 2;
let panning = false;
let panX, panY;
let startX, startY;
let lastX, lastY;
let metersPerPixel;

const startPan = () => {
    const orbit = modelViewer_room.getCameraOrbit();
    const { theta, phi, radius } = orbit;
    const psi = theta - modelViewer_room.turntableRotation;
    metersPerPixel = 0.75 * radius / modelViewer_room.getBoundingClientRect().height;
    panX = [-Math.cos(psi), 0, Math.sin(psi)];
    panY = [
        -Math.cos(phi) * Math.sin(psi),
        Math.sin(phi),
        -Math.cos(phi) * Math.cos(psi)
    ];
    modelViewer_room.interactionPrompt = 'none';
};

const movePan = (thisX, thisY) => {
    const dx = (thisX - lastX) * metersPerPixel;
    const dy = (thisY - lastY) * metersPerPixel;
    lastX = thisX;
    lastY = thisY;

    const target = modelViewer_room.getCameraTarget();
    target.x += dx * panX[0] + dy * panY[0];
    target.y += dx * panX[1] + dy * panY[1];
    target.z += dx * panX[2] + dy * panY[2];
    modelViewer_room.cameraTarget = `${target.x}m ${target.y}m ${target.z}m`;

    // This pauses turntable rotation
    modelViewer_room.dispatchEvent(new CustomEvent(
        'camera-change', { detail: { source: 'user-interaction' } }));
};

const recenter = (pointer) => {
    panning = false;
    if (Math.abs(pointer.clientX - startX) > tapDistance ||
        Math.abs(pointer.clientY - startY) > tapDistance)
        return;
    const rect = modelViewer_room.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hit = modelViewer_room.positionAndNormalFromPoint(x, y);
    modelViewer_room.cameraTarget =
        hit == null ? '0.25m 1m 0.25m' : hit.position.toString();
};

const onPointerUp = (event) => {
    const pointer = event.clientX ? event : event.changedTouches[0];
    if (Math.abs(pointer.clientX - startX) < tapDistance &&
        Math.abs(pointer.clientY - startY) < tapDistance) {
        recenter(pointer);
    }
    panning = false;
};

modelViewer_room.addEventListener('mousedown', (event) => {
    startX = event.clientX;
    startY = event.clientY;
    panning = event.button === 2 || event.ctrlKey || event.metaKey ||
        event.shiftKey;
    if (!panning)
        return;

    lastX = startX;
    lastY = startY;
    startPan();
    event.stopPropagation();
}, true);

modelViewer_room.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    panning = event.touches.length === 2;
    if (!panning)
        return;

    const { touches } = event;
    lastX = 0.5 * (touches[0].clientX + touches[1].clientX);
    lastY = 0.5 * (touches[0].clientY + touches[1].clientY);
    startPan();
}, true);

modelViewer_room.addEventListener('mousemove', (event) => {
    if (!panning)
        return;

    movePan(event.clientX, event.clientY);
    event.stopPropagation();
}, true);

modelViewer_room.addEventListener('touchmove', (event) => {
    if (!panning || event.touches.length !== 2)
        return;

    const { touches } = event;
    const thisX = 0.5 * (touches[0].clientX + touches[1].clientX);
    const thisY = 0.5 * (touches[0].clientY + touches[1].clientY);
    movePan(thisX, thisY);
}, true);

self.addEventListener('mouseup', (event) => {
    recenter(event);
}, true);

self.addEventListener('touchend', (event) => {
    if (event.touches.length === 0) {
        recenter(event.changedTouches[0]);
    }
}, true);
//-----------------------------------------------------------------------------------------------



//Scroll to section functions
//------------------------------------------------------------------------
function animateScrollDown() {
    //document.querySelector("html").style.removeProperty("overflow");
    $('html, body').animate({
        scrollTop: $('section.room').offset().top
    },
        { duration: 500, })
        .promise()
        .done(function () {
            document.getElementById('rollomeister').showPoster();
            document.getElementById('room_scene').dismissPoster();
            document.getElementById('room_scene').jumpCameraToGoal();
        });
}


function animateScrollUp() {
    //document.querySelector("html").style.removeProperty("overflow");
    $('html, body').animate({
        scrollTop: 0
    },
        { duration: 500, })
        .promise()
        .done(function () {
            document.getElementById('room_scene').showPoster();
            document.getElementById('rollomeister').dismissPoster();
        });
}
//------------------------------------------------------------------------