const data = [
    { CodePostal: "97400", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97401", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97402", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97403", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97404", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97405", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97406", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97408", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97409", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97410", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97411", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97412", Ville: "Bras-Panon", Latitude: -20.98446773540355, Longitude: 55.677372434654814 },
    { CodePostal: "97413", Ville: "Cilaos", Latitude: -21.130035162723473, Longitude: 55.470647969576625 },
    { CodePostal: "97414", Ville: "Entre-Deux", Latitude: -21.23794170571739, Longitude: 55.46893748801983 },
    { CodePostal: "97416", Ville: "Saint-Leu", Latitude: -21.15432400712498, Longitude: 55.287190968403436 },
    { CodePostal: "97417", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97418", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97419", Ville: "La Possession", Latitude: -20.92100811802495, Longitude: 55.333108731483755 },
    { CodePostal: "97420", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97421", Ville: "Saint-Louis", Latitude: -21.27731908715484, Longitude: 55.40767839771744 },
    { CodePostal: "97422", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97423", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97424", Ville: "Saint-Leu", Latitude: -21.15432400712498, Longitude: 55.287190968403436 },
    { CodePostal: "97425", Ville: "Les Avirons", Latitude: -21.23691328442064, Longitude: 55.33299054180572 },
    { CodePostal: "97426", Ville: "Les Trois-Bassins", Latitude: -21.094909147131485, Longitude: 55.29551532591936 },
    { CodePostal: "97429", Ville: "Petite-Île", Latitude: -21.350235908826615, Longitude: 55.56529766818878 },
    { CodePostal: "97430", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97431", Ville: "La Plaine-des-Palmistes", Latitude: -21.13007027640564, Longitude: 55.62531891897243 },
    { CodePostal: "97432", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97433", Ville: "Salazie", Latitude: -21.022623830860173, Longitude: 55.539081544179474 },
    { CodePostal: "97434", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97435", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97436", Ville: "Saint-Leu", Latitude: -21.15432400712498, Longitude: 55.287190968403436 },
    { CodePostal: "97437", Ville: "Saint-Benoît", Latitude: -21.06778656278094, Longitude: 55.62505807346149 },
    { CodePostal: "97438", Ville: "Sainte-Marie", Latitude: -20.886955020689122, Longitude: 55.54807525453523 },
    { CodePostal: "97439", Ville: "Sainte-Rose", Latitude: -21.11763113640238, Longitude: 55.793293834117826 },
    { CodePostal: "97440", Ville: "Saint-André", Latitude: -20.95534479107136, Longitude: 55.65014222057726 },
    { CodePostal: "97441", Ville: "Sainte-Suzanne", Latitude: -20.901909785640584, Longitude: 55.6107138547144 },
    { CodePostal: "97442", Ville: "Saint-Philippe", Latitude: -21.349630172022103, Longitude: 55.76623997802982 },
    { CodePostal: "97445", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97446", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97447", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97448", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97449", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177},
    { CodePostal: "97450", Ville: "Saint-Louis", Latitude: -21.27731908715484, Longitude: 55.40767839771744 },
    { CodePostal: "97451", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97452", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97453", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97454", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97455", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97456", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97457", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97458", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97459", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97460", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97461", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97462", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97463", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97464", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97465", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97466", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97467", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97468", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97469", Ville: "Saint-Benoît", Latitude: -21.06778656278094, Longitude: 55.62505807346149 },
    { CodePostal: "97470", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97471", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97472", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97473", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97474", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97475", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97476", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97477", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97478", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97479", Ville: "Saint-Joseph", Latitude: -21.36658189925213, Longitude: 55.61927272510853 },
    { CodePostal: "97480", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97481", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97482", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97483", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97484", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97485", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97486", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97487", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97488", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97496", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97497", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97499", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97701", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97702", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97703", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97704", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97705", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97706", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97707", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97708", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97709", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97711", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97712", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97713", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97714", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97715", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97716", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97717", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97718", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97719", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97743", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97751", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97801", Ville: "Saint-Denis", Latitude: -20.881089634553273, Longitude: 55.449475008904365 },
    { CodePostal: "97802", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97803", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97804", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97805", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97806", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97821", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97822", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97823", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97824", Ville: "Le Port", Latitude: -20.933175805921838, Longitude: 55.290307886863516 },
    { CodePostal: "97825", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97826", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97827", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97828", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97829", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97831", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97832", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97833", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97834", Ville: "Le Tampon", Latitude: -21.26948718339139, Longitude: 55.51511978779879 },
    { CodePostal: "97835", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97836", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97837", Ville: "Saint-Pierre", Latitude: -21.3336169178937, Longitude: 55.475154995177036 },
    { CodePostal: "97838", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97839", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97851", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97852", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97853", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97861", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97862", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97863", Ville: "Saint-Paul", Latitude: -20.992597583044493, Longitude: 55.2690488847869 },
    { CodePostal: "97864", Ville: "Saint-Louis", Latitude: -21.27731908715484, Longitude: 55.40767839771744 },
    { CodePostal: "97865", Ville: "Saint-Louis", Latitude: -21.27731908715484, Longitude: 55.40767839771744 }
];