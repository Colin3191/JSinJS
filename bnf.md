终结符
"gu"
"pu"

产生式
<word>::="pa"|"gu"
<ufo>::=<word>|<ufo><word>

pa gu gu
gu gu gu pa
pa

<word> = "pa" "gu" "gu" | "gu" "gu" "gu" "pa" | "pa"
<ufo>::=<word>|<ufo><word>