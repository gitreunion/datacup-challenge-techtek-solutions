# Données

## Requête : Tous les contrats pour la Réunion

```javascript
const axios = require('axios');

async function fetchAllContracts() {
  try {
    const response = await axios.get(
      'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
      {
        params: {
          select: 'id, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur',
          where: 'code_departement=974',
          limit: 20,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching contracts:', error);
  }
}

```

### Réponse Possible

```json
{
  "total_count": 32470,
  "results": [
    {
      "id": "BOAMP-06-101-0001-01",
      "objet": "plate forme pour enceintes à hygrométrie à Saint Pierre.",
      "dateparution": "2006-05-27",
      "datefindiffusion": "2006-06-27",
      "datelimitereponse": "2006-06-27T00:00:00+00:00",
      "nomacheteur": "sga/dcsid/dt-sds."
    },
    ...
  ]
}
```

---

## Requête : Tous les contrats de services pour la Réunion

```javascript
const axios = require('axios');

async function fetchAllContracts() {
  try {
    const response = await axios.get(
      'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
      {
        params: {
          select: 'id, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur',
          where: 'code_departement=974 and type_marche="SERVICES"',
          limit: 20,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching service contracts:', error);
  }
}

```

### Réponse Possible

```json
{
  "total_count": 32470,
  "results": [
    {
      "id": "BOAMP-08-191-0001-01",
      "objet": "Collecte et traitement des déchets d'activité de soins à risques infectieux et assimilés à Saint-Denis",
      "dateparution": "2008-10-04",
      "datefindiffusion": "2008-11-21",
      "datelimitereponse": "2008-11-21T00:00:00+00:00",
      "nomacheteur": "CHD Félix Guyon"
    },
    ...
  ]
}
```

## Requête : Tous les contrats de travaux pour la Réunion

```javascript
const axios = require('axios');

async function fetchServiceBuildingContracts() {
  try {
    const response = await axios.get(
      'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
      {
        params: {
          select: 'id, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur',
          where: 'code_departement=974 and type_marche="TRAVAUX"',
          limit: 20,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching service contracts:', error);
  }
}
```

### Réponse Possible

```json
{
  "total_count": 32470,
  "results": [
    {
      "id": "BOAMP-08-191-0001-01",
      "objet":"travaux acrobatiques dans le cadre de l'aménagement et la mise en sécurité du chemin Bory Saint Vincent à Saint-Joseph",
      "dateparution":"2008-09-27",
      "datefindiffusion":"2008-10-20",
      "datelimitereponse":"2008-10-20T00:00:00+00:00",
      "nomacheteur":"Commune de Saint-Joseph"
    },
    ...
  ]
}
```

## Requête : Tous les contrats de fournitures pour la Réunion

```javascript
const axios = require('axios');

async function fetchServiceSupplyContracts() {
  try {
    const response = await axios.get(
      'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
      {
        params: {
          select: 'id, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur',
          where: 'code_departement=974 and type_marche="FOURNITURES"',
          limit: 20,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching service contracts:', error);
  }
}
```

### Réponse Possible

```json
{
  "total_count": 32470,
  "results": [
    {
      "id": "BOAMP-08-191-0001-01",
      "objet": "Fourniture de produits d'entretien pour les services de la ville de Saint-Denis",
      "dateparution": "2008-10-04",
      "datefindiffusion": "2008-11-21",
      "datelimitereponse": "2008-11-21T00:00:00+00:00",
      "nomacheteur": "Ville de Saint-Denis"
    },
    ...
  ]
}
```


## Requête : Un contrat par id

```javascript
const axios = require('axios');

async function fetchServiceSupplyContracts(id) {
  try {
    const response = await axios.get(
      'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
      {
        params: {
          where: 'id="' + id + '"',
          limit: 20,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching service contracts:', error);
  }
}
```
