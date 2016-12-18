import xml.etree.ElementTree as ET

root = ET.fromstring(b'<annotated-string><sentence><word part-of-speech="NNP">Alex</word><word d1="have the quality of being; (copula, used with an adjective or a predicate noun)" d10="spend or use time" d11="have life, be alive" d12="to remain unmolested, undisturbed, or uninterrupted -- used only in infinitive form" d13="be priced at" d2="be identical to; be someone or something" d3="occupy a certain position or area; be somewhere" d4="have an existence, be extant" d5="happen, occur, take place; this was during the visit to my parents\' house&quot;" d6="be identical or equivalent to" d7="form or compose" d8="work in a specific place, with a specific subject, or in a specific function" d9="represent, as of a character on stage" s1="live" s10="exist" s11="embody" s12="personify" s2="represent" s3="be" s4="comprise" s5="follow" s6="cost" s7="make_up" s8="equal" s9="constitute" part-of-speech="VBZ">is</word><word d1="a metric unit of length equal to one ten billionth of a meter (or 0.0001 micron); used to specify wavelengths of electromagnetic radiation" d2="any of several fat-soluble vitamins essential for normal vision; prevents night blindness or inflammation or dryness of the eyes" d3="one of the four nucleotides used in building DNA; all four nucleotides have a common phosphate group and a sugar (ribose)" d4="(biochemistry) purine base found in DNA and RNA; pairs with thymine in DNA and with uracil in RNA" d5="the basic unit of electric current adopted under the Systeme International d\'Unites" d6="the 1st letter of the Roman alphabet" d7="the blood group whose red cells carry the A antigen" s1="antiophthalmic_factor" s10="ampere" s11="amp" s12="deoxyadenosine_monophosphate" s13="angstrom" s2="group_A" s3="angstrom_unit" s4="a" s5="axerophthol" s6="adenine" s7="A" s8="type_A" s9="vitamin_A" part-of-speech="DT">a</word><word d1="a learner who is enrolled in an educational institution" d2="a learned person (especially in the humanities); someone who by long study has gained mastery in one or more disciplines" s1="scholarly_person" s2="educatee" s3="scholar" s4="pupil" s5="bookman" s6="student" part-of-speech="NN">student</word><word part-of-speech=".">.</word></sentence></annotated-string>')


for sentence in root:
    for word in sentence:
        print('"{}" is {}'.format(word.text, word.attrib['part-of-speech']))
        syn = []
        defs = []
        for att, value in word.attrib.items():
            if att.startswith('s'):
                syn.append(value)
            if att.startswith('d'):
                defs.append(value)
        print('Synonyms {}'.format(syn))
        print('Definitions {}'.format(defs))