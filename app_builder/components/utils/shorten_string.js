export function shorten_string(string,length) {


    let new_string = string.substring(0,length+1);

    if(new_string.length< string.length)
    {
        new_string = new_string + "...";
    }

    return new_string
}