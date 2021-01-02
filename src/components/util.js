import numeral from "numeral"

function prettyPrintStat(stat){
    return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
}

export default prettyPrintStat;