//Date: 23/5/2023
//Name: Rafi Ull Islam
//A Color Piker Application


//Select All Refarances

let click_btn = document.querySelector(".clik_btn")
let body = document.querySelector(".body")
let Output = document.querySelector(".Main_form")
let copy_btn = document.querySelector('#copy_btn')
let div_output = document.querySelector(".div_output")
let rgb_from = document.querySelector(".rgb_from")
let rgb_btn = document.querySelector(".Rgb_sub")
let div_2_Output = document.querySelector(".div2_output")
let re = /^([A-za-z0-9]){0,6}$/i
let Color_slider_red = document.querySelector(".inp_red");
let Color_slider_green = document.querySelector(".inp_green")
let Color_slider_blue = document.querySelector(".inp_blue")
let Radio_btn_1 = document.getElementById("age1")
let Radio_btn_2 = document.getElementById("age2")
let radio_btns = document.querySelectorAll(".radio")
let Color_precet = document.querySelector(".color_precets_area")
let svae_btn = document.querySelector(".save_btn")
let Save_color_parents = document.querySelector(".custom_colors_area")
let file_input = document.querySelector(".file-input")
let file_upload_btn = document.querySelector(".file_upload_btn")
let file_delete_btn = document.querySelector('.file_delete_btn')
file_delete_btn.style.display = "none"
const preview_box = document.querySelector('.preview_box')
const bg_controller = document.getElementById("bg_controller")
bg_controller.style.display = "none"
const Custom_Arry = []
const defaultPresetColors = [
    '#ffcdd2',
    '#f8bbd0',
    '#e1bee7',
    '#ff8a80',
    '#ff80ab',
    '#ea80fc',
    '#b39ddb',
    '#9fa8da',
    '#90caf9',
    '#b388ff',
    '#8c9eff',
    '#82b1ff',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#80d8ff',
    '#84ffff',
    '#a7ffeb',
    '#c8e6c9',
    '#dcedc8',
    '#f0f4c3',
    '#b9f6ca',
    '#ccff90',
    '#ffcc80',
];

let sound = new Audio("./src_project-10_copy-sound.wav")

document.getElementById("bg-size").addEventListener("change", BGControlChanger)
document.getElementById("bg-repeat").addEventListener("change", BGControlChanger)
document.getElementById("bg-position").addEventListener("change", BGControlChanger)
document.getElementById("bg-attachment").addEventListener("change", BGControlChanger)
click_btn.addEventListener("click", BGchange)
copy_btn.addEventListener("click", copyFun)
Output.addEventListener("keyup", FormColorChange)
svae_btn.addEventListener("click", AddColorToCustom)


file_upload_btn.addEventListener("click", () => {
    file_input.click()
})
file_input.addEventListener("change", (e) => {
    const FILES = e.target.files[0]
    const ImgUrl = URL.createObjectURL(FILES)
    preview_box.style.background = `url(${ImgUrl})`
    document.body.style.background = `url(${ImgUrl})`
    file_delete_btn.style.display = "inline"
    bg_controller.style.display = "block"
})
file_delete_btn.addEventListener("click", () => {
    preview_box.style.background = "none"
    preview_box.style.backgroundColor = "#FFF"
    document.body.style.background = "none"
    file_delete_btn.style.display = "none"
    bg_controller.style.display = "none"
    file_input.value = null
})
Color_slider_red.addEventListener("change", function (e) {
    const color = {
        red: parseInt(Color_slider_red.value),
        green: parseInt(Color_slider_green.value),
        blue: parseInt(Color_slider_blue.value),
    }

    UpdateRefarancesColor(color)

})
Color_slider_green.addEventListener("change", function () {
    const color = {
        red: parseInt(Color_slider_red.value),
        green: parseInt(Color_slider_green.value),
        blue: parseInt(Color_slider_blue.value),
    }

    UpdateRefarancesColor(color)
})

Color_slider_blue.addEventListener("change", function () {
    const color = {
        red: parseInt(Color_slider_red.value),
        green: parseInt(Color_slider_green.value),
        blue: parseInt(Color_slider_blue.value),
    }

    UpdateRefarancesColor(color)
})

function OnloadUpdater() {
    let UpdateColor = {
        red: 180,
        green: 234,
        blue: 243
    }
    let UpdateHex = Color_Converter(UpdateColor)
    let UpdateRgb = `rgb(${UpdateColor.red},${UpdateColor.green},${UpdateColor.blue})`
    Output.value = UpdateHex
    rgb_from.value = UpdateRgb
    document.querySelector(".lable_red_value").innerHTML = UpdateColor.red
    document.querySelector(".lable_green_value").innerHTML = UpdateColor.green
    document.querySelector(".lable_blue_value").innerHTML = UpdateColor.blue
    document.querySelector(".inp_red").value = UpdateColor.red
    document.querySelector(".inp_green").value = UpdateColor.green
    document.querySelector(".inp_blue").value = UpdateColor.blue


}


// Onload Event
function BGControlChanger() {
    document.body.style.backgroundSize = document.getElementById("bg-size").value
    document.body.style.backgroundRepeat = document.getElementById("bg-repeat").value
    document.body.style.backgroundPosition = document.getElementById("bg-position").value
    document.body.style.backgroundAttachment = document.getElementById("bg-attachment").value
}


window.onload = () => {
    CreateColorBoxes(document.querySelector(".color_precets_area"), defaultPresetColors)
    OnloadUpdater()

    //const dataArray = JSON.parse(localStorage.getItem("task")) || [];
    //CreateColorBoxes2(Save_color_parents, dataArray)
    showData()
}

Color_precet.addEventListener("click", (event) => {
    let child = event.target
    let count = 0
    if (child.className == "div_boxes") {
        //alert(child.getAttribute("color_Deta"))
        navigator.clipboard.writeText(child.getAttribute("color_Deta"))
        sound.volume = 0.2
        sound.play()
        count++
        navigator.clipboard.writeText(child.getAttribute("color_Deta"))
        let div = document.createElement("div")
        div.className = "notification_div"
        div.setAttribute("meta", count)
        div.appendChild(document.createTextNode(`${child.getAttribute("color_Deta")} is Copyed`))
        div_output.appendChild(div)
        setTimeout(() => {
            div.className = "remove_div"
        }, 3000)
        div_output.children[0].removeAttribute("meta")
        if (div.hasAttribute("meta")) {
            div_output.children[0].remove()
        }
        div.addEventListener("click", (e) => {
            e.target.remove()
        })

    }
})
Save_color_parents.addEventListener("click", (event) => {
    let child = event.target
    let count = 0
    if (child.className == "div_boxes2") {
        //alert(child.getAttribute("color_Deta"))
        navigator.clipboard.writeText(child.getAttribute("color_Deta"))
        sound.volume = 0.2
        sound.play()
        count++
        navigator.clipboard.writeText(child.getAttribute("color_Deta"))
        let div = document.createElement("div")
        div.className = "notification_div"
        div.setAttribute("meta", count)
        div.appendChild(document.createTextNode(`${child.getAttribute("color_Deta")} is Copyed`))
        div_output.appendChild(div)
        setTimeout(() => {
            div.className = "remove_div"
        }, 3000)
        div_output.children[0].removeAttribute("meta")
        if (div.hasAttribute("meta")) {
            div_output.children[0].remove()
        }
        div.addEventListener("click", (e) => {
            e.target.remove()
        })

    }
})



// Dom Manage Functions

let color_custom_value = []

function AddColorToCustom() {
    color_custom_value = `#${Output.value}`
    let task = []
    if (localStorage.getItem("task") === null) {
        task = []
    } else {
        task = JSON.parse(localStorage.getItem("task"))
    }
    if (task.includes(color_custom_value)) {
        alert('alrady you have the color on customs')
        return;
    }
    if (task.length < 12) {

        task.unshift(color_custom_value)
    } else {
        alert("Alrady You Have Maximum Colors In Customs")
    }

    localStorage.setItem("task", JSON.stringify(task))
    showData()


}


/************************************************************** */
function showData() {
    const dataList = document.querySelector(".custom_colors_area");
    dataList.innerHTML = "";
    const dataArray = JSON.parse(localStorage.getItem("task")) || [];
    dataArray.forEach((item, index) => {
        const Div = document.createElement("li");
        const LatestABtn = document.createElement("button")
        const LAtestI = document.createElement("i")
        LAtestI.className = "fa-solid fa-trash-can fa-sm"
        //LatestABtn.style.color = "#DDDDDD"
        LAtestI.style.position = "absolute"
        LAtestI.style.top = "45%"
        LAtestI.style.left = "17%"
        LAtestI.style.boxShadow = "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
        LatestABtn.className = "Custom_Button_a"
        LatestABtn.style.position = "absolute"
        LatestABtn.setAttribute("href", "#")
        LatestABtn.appendChild(LAtestI)
        Div.className = "div_boxes2"
        Div.style.backgroundColor = item
        Div.setAttribute("color_Deta", item)
        Div.setAttribute("Data_index2", index)
        LatestABtn.addEventListener("click", RemoveDAtaByClick)
        Div.addEventListener("mouseover", () => {
            Div.appendChild(LatestABtn)
            LatestABtn.style.top = "0%"
            LatestABtn.style.left = "0%"
        })
        Div.addEventListener("mouseout", () => {
            LatestABtn.style.top = "-400%"
        })
        Div.addEventListener("click", LatestCustomDivCopy)
        dataList.appendChild(Div);
    });

}

function LatestCustomDivCopy() {

}
//*************************************************************************** */
/**
 * its Can Change The Background And Show The Valu's in Input From
 */

function BGchange() {
    let color = HexColorMake()
    let rgba = RgbConv(color)
    let hex = Color_Converter(color)
    Output.value = `${hex}`
    rgb_from.value = rgba
    body.style.backgroundColor = `#${Output.value}`
    let Rcolor = ValidRgb(Output.value)
    document.querySelector(".lable_red_value").innerHTML = Rcolor.red
    document.querySelector(".lable_green_value").innerHTML = Rcolor.green
    document.querySelector(".lable_blue_value").innerHTML = Rcolor.blue
    document.querySelector(".inp_red").value = Rcolor.red
    document.querySelector(".inp_green").value = Rcolor.green
    document.querySelector(".inp_blue").value = Rcolor.blue


}


/**
 * It Can Copy The Hex Color Code And Show A Tost Massage
 */



function copyFun() {
    let count = 0
    if (re.test(Output.value) == true) {

        if (ChackRadioBtn(radio_btns) == "Hex") {
            count++
            navigator.clipboard.writeText(`#${Output.value}`)
            let div = document.createElement("div")
            div.className = "notification_div"
            div.setAttribute("meta", count)
            div.appendChild(document.createTextNode(`#${Output.value} is Copyed`))
            div_output.appendChild(div)
            div_output.children[0].removeAttribute("meta")
            setTimeout(function () {
                div.className = "remove_div"
            }, 3000)
            if (div.hasAttribute("meta")) {
                div_output.children[0].remove()
            }


            div.addEventListener("click", (e) => {
                e.target.remove()
            })

        } else if (ChackRadioBtn(radio_btns) == "RGB") {
            count++
            navigator.clipboard.writeText(rgb_from.value)
            let div = document.createElement("div")
            div.className = "notification_div"
            div.setAttribute("meta", count)
            div.appendChild(document.createTextNode(`${rgb_from.value} is Copyed`))
            div_output.appendChild(div)
            div_output.children[0].removeAttribute("meta")
            setTimeout(function () {
                div.className = "remove_div"
            }, 5000)
            if (div.hasAttribute("meta")) {
                div_output.children[0].remove()
            }
            div.addEventListener("click", (e) => {
                e.target.remove()
            })
        } else {

        }

    } else {
        alert("Plz Add Minumium 6 Dist Code Wth-Out #")

    }

}


/**
 * It Can Change The Color By Changing The Color Code
 */

function FormColorChange(e) {
    if (re.test(e.target.value) == true) {

        let RGb_Valid = ValidRgb(e.target.value)
        body.style.backgroundColor = `#${e.target.value}`
        rgb_from.value = `rgb(${RGb_Valid.red},${RGb_Valid.green},${RGb_Valid.blue})`
        document.querySelector(".lable_red_value").innerHTML = RGb_Valid.red
        document.querySelector(".lable_green_value").innerHTML = RGb_Valid.green
        document.querySelector(".lable_blue_value").innerHTML = RGb_Valid.blue
        document.querySelector(".inp_red").value = RGb_Valid.red
        document.querySelector(".inp_green").value = RGb_Valid.green
        document.querySelector(".inp_blue").value = RGb_Valid.blue




    }
}

/**
 * It Can update Colors golobaly
 */

function UpdateRefarancesColor({ red, green, blue }) {
    function RgbCodeValidate(value) {
        let rgbA = value
        return rgbA.length == 1 ? `0${rgbA}` : rgbA
    }
    /**
     * 
     * @param {Array} color 
     */
    function ClorPrisetBoxes(color) {
        let Div = document.createElement("div")
        Div.className = "div_boxes"
        Div.setAttribute("color_Deta", color)
        Div.style.backgroundColor = color

        return Div
    }

    /**
     * 
     * @param {object} parent 
     * @param {Array} color 
     */
    function CreateColorBoxes(parent, color) {
        color.forEach((color) => {
            let Color_Div = ClorPrisetBoxes(color)
            parent.appendChild(Color_Div)
        })
    }
    let NextRgb = `rgb(${RgbCodeValidate(red)},${RgbCodeValidate(green)},${RgbCodeValidate(blue)})`
    let NexHex = `${RgbCodeValidate(red.toString(16))}${RgbCodeValidate(green.toString(16))}${RgbCodeValidate(blue.toString(16))}`;
    Output.value = NexHex
    rgb_from.value = NextRgb
    body.style.backgroundColor = `#${NexHex}`
    document.querySelector(".lable_red_value").innerHTML = red
    document.querySelector(".lable_green_value").innerHTML = green
    document.querySelector(".lable_blue_value").innerHTML = blue


}




/**
 * It Retuns a Object of Color
 * @returns {object}
 */
function HexColorMake() {
    let red = Math.floor(Math.random() * 100)
    let green = Math.floor(Math.random() * 100)
    let blue = Math.floor(Math.random() * 100)

    return {
        red,
        green,
        blue,
    }
}


/**
 * It Distract A Color Object
 * @param {color} param0 
 * @returns {string}
 */
function Color_Converter({ red, green, blue }) {

    function TwoCode(value) {
        let hex = value.toString(16)
        return hex.length == 1 ? `0${hex}` : hex
    }

    return `${TwoCode(red)}${TwoCode(green)}${TwoCode(blue)}`.toLocaleUpperCase()
}


/**
 * It Distract Some Color's And return A Rgb Color String
 * @param {colors} param0 
 * @returns {string}
 */
function RgbConv({ red, green, blue }) {

    return `rgb(${red}, ${green}, ${blue})`.toString(10)

}


/**
 *It Can Update rgb Colors By Change The Input Value 
 * @param {string} Hex
 */
function ValidRgb(hex) {
    let red = parseInt(hex.slice(0, 2), 16)
    let green = parseInt(hex.slice(2, 4), 16)
    let blue = parseInt(hex.slice(4), 16)
    // return `rgb(${red},${green},${blue})`
    return {
        red,
        green,
        blue
    }
}

/**
 * 
 * @param {array} radios 
 * @returns {string | null}
 */
function ChackRadioBtn(radios) {
    let RgbValide = null
    radios.forEach(function (e, i) {
        if (e.checked == true) {
            RgbValide = e.value
        }
    })
    return RgbValide
}


/**
 * 
 * @param {Array} color 
 */
function ClorPrisetBoxes(color) {
    let Div = document.createElement("div")
    Div.className = "div_boxes"
    Div.setAttribute("color_Deta", color)
    Div.style.backgroundColor = color

    return Div
}

/**
 * 
 * @param {object} parent 
 * @param {Array} color 
 */
function CreateColorBoxes(parent, color) {
    color.forEach((color) => {
        let Color_Div = ClorPrisetBoxes(color)
        parent.appendChild(Color_Div)
    })
}

function RemovedataFromLocal(e) {
    const index = e.target.getAttribute("data-index");
    let task = []
    if (localStorage.getItem("task") === null) {
        task = []
    } else {
        task = JSON.parse(localStorage.getItem("task"))
    }
    task.splice(index, 1)
    localStorage.setItem("task", JSON.stringify(task))
}


/**
 * remove all children from parent
 * @param {object} parent
 */
function removeChildren(parent) {
    let child = parent.lastElementChild;
    while (child) {
        parent.removeChild(child)
        child = parent.lastElementChild
    }
}

//task.splice(index, 1);

function RemoveDAtaByClick(event) {
    let Latest_Index = event.target.getAttribute("data_index2")
    // Retrieve the array from localStorage
    const dataArray = JSON.parse(localStorage.getItem("task")) || [];
    dataArray.splice(Latest_Index, 1);
    localStorage.setItem("task", JSON.stringify(dataArray));
    showData()
}