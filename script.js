var uu_tien = 0;
 
var mang_index = 0;
var mang = new Array();
var phantu ='';
var is_dotted = false;

var ketqua = document.getElementById("ketqua");
var ketqua_value = '';

var length = phantu.length;
var length_kq = ketqua_value.length;

//check valid input and whether input create a new element
function is_new_element(val) {
    console.log(length_kq + ketqua_value[0]);
        if(val == 1 ||
            val == 2 ||
            val == 3 ||
            val == 4 ||
            val == 5 ||
            val == 6 ||
            val == 7 ||
            val == 8 ||
            val == 9 ||
            val == 0 ||
            val == "." ) {
                if (length_kq == 1 && ketqua_value[0] == '-') {
                    return false;
                }
                if(ketqua_value[length_kq-1] == '-') {
                    if (ketqua_value[length_kq-2] == '+' || ketqua_value[length_kq-2] == '-' || ketqua_value[length_kq-2] == 'X' || ketqua_value[length_kq-2] == '/' ) {
                        return false;
                    } else {
                        return true;
                    }
                } else if (ketqua_value[length_kq-1] == '+' || ketqua_value[length_kq-1] == '/' || ketqua_value[length_kq-1] == 'X' ) {
                    return true;
                } else {
                    return false;
                }
                
        }

        if (val == '+') {
            return true;
        }

        if (val == '-') {
            if (ketqua_value[length_kq-1] == '+' || ketqua_value[length_kq-1] == '-'){ 
                return true; 
            } else if (length_kq == 0) {
                return false;
            } else {
                return true;
            }
        }

        if (val == 'X' || val == '/'){
            return true;
        }
}

function is_doted_before_chua(){
    for (let s of phantu) {
        if (s == '.') return true;
    }
    return false;
}

function is_valid_input(val) {
    length_kq = ketqua_value.length;
    length = phantu.length;
    if (length_kq == 0) {
        if (val == '.' || val == 0  || val == "X" || val == "+" || val == '=' || val == '/') { console.log("000"); return false; }
    } else if (length_kq == 1 && ketqua_value[0] == '-' ) {
        if (val == '.' || val == "X" || val == "+" || val == '=' || val == '/' || val == '-' ) {
            console.log('11');
            return false;
        }
    } else {
        if (val == '+') {
            if (phantu[length-1] == '+' || phantu[length-1] == '-' || phantu[length-1] == 'X' || phantu[length-1] == '/' || phantu[length-1] == '.'){
                console.log('+');
                return false;
            }
        }
        if (val == '-') {
            console.log(ketqua_value[length_kq-1] + ' | ' + ketqua_value[length_kq-2]);
            if (ketqua_value[length_kq-1] == '+' || ketqua_value[length_kq-1] == '-') {
                if (ketqua_value[length_kq-2] == '+' || ketqua_value[length_kq-2] == '-' || ketqua_value[length_kq-2] == 'X' || ketqua_value[length_kq-2] == '/') {
                  //  console.log(ketqua_value[length_kq-1] + ' ||  ' + ketqua_value[length_kq-2]);
                  
                    return false;
                }
            }
            if (phantu[length-1] == '.') {
                console.log('.');
                return false;
            }
        }
        if (val == 'X' || val == '/') {
            if (phantu[length-1] == '+' || phantu[length-1] == '-' || phantu[length-1] == 'X' || phantu[length-1] == '/'|| phantu[length-1] == '.') {
                console.log('X//');
                return false;
            }
        }
        if (val == '.') {
            if (is_doted_before_chua()) {
                alert ("dotted before!!");
                return false;
            } else {
                return true;
            }
        }
     }
     return true;

    
}

function clickBtn(obj){
    
    if (is_valid_input(obj.innerHTML) == true) {
        ketqua_value += obj.innerHTML;
        if (obj.innerHTML == '=') {
            mang.push(phantu);
            ketqua_value = tinh_toan();
            for (let s of mang) {console.log(s);}
            ketqua.setAttribute("value",ketqua_value);
            mang = new Array();
            phantu = '';
            ketqua_value = 0;
           
        } else if (obj.innerHTML == 'CE'){
            ketqua.setAttribute("value","");
            mang = new Array();
            phantu = '';
            ketqua_value = "";
        } else {
         
            ketqua.setAttribute("value",ketqua_value);
            if(is_new_element(obj.innerHTML)) {
                mang.push(phantu);
                phantu = '';
                phantu += obj.innerHTML;
            } else {
                phantu += obj.innerHTML;
            }
        }
    }
}

function tinh_toan(){
    var mang_so = new Array();
    for(let s of mang) {
        if (s != '+' && s != '-' && s != 'X' && s != '/'){
            mang_so.push(parseInt(s));    
        }
        else mang_so.push(s);
    }
    for(let i = 0;i < mang_so.length; i++) {
        if (mang_so[i] == 'X') {
            mang_so[i+1] = mang_so[i+1]*mang_so[i-1];
            mang_so.splice(i-1,2);
        }
        if (mang_so[i] == '/') {
            mang_so[i+1] = mang_so[i-1] / mang_so[i+1];
            mang_so.splice(i-1,2);
        }
    }
    for(let i = 0;i < mang_so.length; i++) {
        if (mang_so[i] == '+') {
            mang_so[i+1] = mang_so[i+1]+mang_so[i-1];
            mang_so.splice(i-1,2);
        }
        if (mang_so[i] == '-') {
            mang_so[i+1] = mang_so[i-1] - mang_so[i+1];
            mang_so.splice(i-1,2);
        }
        console.log(mang_so.length + ' ');
        if(mang_so.length == 1) { break;}
    }
    return mang_so[0];
}

