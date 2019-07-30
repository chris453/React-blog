export function getAvatar(text) {
        console.log(text);
    return {
        type: "AVATAR",
        content: text

    }
}

export function getUserNameNumber(text) {
   // console.log(text);
   // alert(text);
        return {
            type: "USERNAMENUMBER",
            content: text

        }
    
}
export function getNameKey(text) {
 //   console.log(text);
  //  alert(text);
    return {
        type: "NAMEKEY",
        content: text

    }

}
