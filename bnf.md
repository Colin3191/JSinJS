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

<word1>::="pa""gu""gu"
<word2>::="gu""gu""gu""pa"
<word3>::="pa"

<ufo>::=<word1>*<word3>?<word2>*

<op>::="+"
<number>
<add>::=<number>|<add><op><add>
