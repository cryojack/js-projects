window.addEventListener('load', function() {
    const url = 'https://ragnapi.com/api/v1/';
    const version = document.getElementById('version')
    const search = document.getElementById('search')
    const data = document.getElementById('data')
    const button = document.getElementById('button')
    const card = document.querySelector('.information')

    function getValues(url) {
        let v = version.value
        let s = search.value
        let d = data.value
        return url + v + '/' + s + '/' + d
    }

    function showTrimmed(val) {
        let v = val
        v = v.replace(/\,/g,'')
        v = v.replace(/ /g, '')
        v = v.replace(/~/g, '-')
        return v
    }

    function elemFormat(val) {
        if(val < 0) {
            return 'less'
        }
        else if(val > 100) {
            return 'great'
        }
    }

    function capitalizeAll(val) {
        return val.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }

    function splitStr(val) {
        return val.split('_').join(' ')
    }

    function firstLetter(val) {
        return val[0].toUpperCase() + val.substring(1)
    }

    function isLess1000(val) {
        return (val <= 1000) ? 10 : 100
    }

    function formatDef(val) {
        let num = val.split('+')
        let n1 = parseFloat(num[0])
        let n2 = parseFloat(num[1])
        n2 = (n2 / isLess1000(n2)).toPrecision(num[1].length - 2).split('.')
        n2[1] = n2[1] / 100

        return n1 + '+' + n2[0] + ' (' + n2[1] + '%)'
    }

    function formatMDef(val) {
        let n1 = parseFloat(val)
        let n2 = (n1 / isLess1000(n1)).toPrecision(val.length - 2).split('.')
        n2[1] = n2[1] / 100

        return n2[0] + ' (' + n2[1] + '%)'
    }

    function returnModes(arr) {
        let a = ''
        for (let i = 0; i < arr.length; i++) {
            a += `<li>${firstLetter(splitStr(arr[i]))}</li>`
        }
        return a
    }

    function returnSkills(arr) {
        let a = ''
        if(arr.length < 1) {
            a += `<div class="heading">
                    <h6>Skills</h6>
                </div>
                <div class="skill-info">
                    <ul>
                        <li>No skills found for this monster</li>`
        } else {
            a += `<div class="heading">
                    <h6>Skills (${arr.length} ${arr.length < 2 ? `skill` : `skills`})</h6>
                </div>
                <div class="skill-info">
                    <ul>`
            for (let i = 0; i < arr.length; i++) {
                a += `<li>LV ${arr[i]['level'] + ' ' + capitalizeAll(arr[i]['name'])}</li>`
            }
        }
        a += `</ul>
            </div>`
        return a
    }

    
    function returnDrops(arr) {
        //.split('/')[5].split('.')[0]
        let u = 'https://db.irowiki.org/db/item-info/'
        let a = ''
        if(arr.length < 1) {
            a += `<div class="heading">
                    <h6>Drops</h6>
                </div>
                <div class="drop-info">
                    <ul>
                        <li><p class="drop-name">No drops found for this monster</p><li>`
        } else {
            a += `<div class="heading">
                    <h6>Drops (${arr.length} ${arr.length < 2 ? `drop` : `drops`})</h6>
                </div>
                <div class="drop-info">
                    <ul>`
            for (let i = 0; i < arr.length; i++) {
                let item_id = arr[i]['img'].split('/')[5].split('.')[0]
                let item_link = u + item_id + '/'
                //let item_fetch = fetch(url + version.value + '/items/' + item_id)
                a += `<li>
                        <div class="drop-img">
                            <img src="${arr[i]['img']}" alt="${arr[i]['name']}">
                        </div>
                        <p class="drop-name">
                            <a target='_blank' href='${item_link}'>${capitalizeAll(arr[i]['name'])}</a>
                        </p>
                        <p class="drop-rate">${arr[i]['rate']}%</p>
                    </li>`
            }
        }
        a += `</ul>
            </div>`
        return a
    }


    function returnMaps(arr) {
        //.split('/')[6].split('.')[0]
        let u = 'https://db.irowiki.org/db/map-info/'
        let a = ''
        if(arr.length < 1) {
            a += `<div class="heading">
                    <h6>Maps</h6>
                </div>
                <div class="map-info">
                    <ul>
                        <li><p class="map-name">No maps found for this monster</p><li>`
        } else {
            a += `<div class="heading">
                    <h6>Maps (${arr.length} ${arr.length < 2 ? `map` : `maps`})</h6>
                </div>
                <div class="map-info">
                    <ul>`
            for (let i = 0; i < arr.length; i++) {
                let map_id = u + arr[i]['img'].split('/')[6].split('.')[0] + '/'
                a += `<li>
                        <div class="map-name">
                            <p>
                                <a target='_blank' href='${map_id}'>
                                ${capitalizeAll(arr[i]['name'])} <span class="m-lvl">${arr[i]['number']}</span>
                                </a>
                            </p>
                        </div>
                        <div class="map-details">
                            <div class="m-img">
                                <img src="${arr[i]['img']}" alt="${arr[i]['name']}">
                            </div>
                            <div class="m-txt">
                                <p class="m-type">${arr[i]['type'].toUpperCase()}</p>
                                <p class="m-freq">${arr[i]['amount']}, ${capitalizeAll(arr[i]['frequency'])}</p>
                            </div>
                        </div>
                    </li>`
            }
        }
        a += `</ul>
            </div>`
        return a
    }

    function returnSummons(arr) {
        let a = ''
        if(arr === undefined || arr.length < 1) {
            a += `<h6>Summon Mob</h6>
                    <ul>
                        <li>No summons found<li>`
        } else {
            a += `<h6>Summon Mob (${arr.length} ${arr.length < 2 ? `summon` : `summons`})</h6>
                    <ul>`
            for(let i = 0; i < arr.length; i++) {
                a += `<li>${capitalizeAll(arr[i][1])} (${arr[i][0]})<li>`
            }
        }
        a += `</ul>`
        return a
    }

    function returnSpawns(arr) {
        let a = ''
        if(arr === undefined || arr.length < 1) {
            a += `<h6>Spawn Mob</h6>
                    <ul>
                        <li>No spawns found<li>`
        } else {
            a += `<h6>Spawn Mob (${arr.length} ${arr.length < 2 ? `spawn` : `spawns`})</h6>
                    <ul>`
            for(let i = 0; i < arr.length; i++) {
                a += `<li>${capitalizeAll(arr[i][1])} (${arr[i][0]})<li>`
            }
        }
        a += `</ul>`
        return a
    }

    function showInfo(obj,card) {
        let id   = obj['monster_id']
        let name = capitalizeAll(obj['monster_info'])
        let race = capitalizeAll(obj['race'])
        let size = firstLetter(obj['size'])
        let type = firstLetter(obj['type'])
        let epow = obj['element_power']
        let img  = obj['gif']

        let attr  = obj['main_atb']
        let stats = obj['main_stats']
        let elem  = obj['elementalDamage']

        let modes   = obj['skills']['mode']
        let skills  = obj['skills']['spell']
        let drops   = obj['drops']
        let maps    = obj['maps']
        let summons = obj['skills']['summon']['summon_mob'] ? obj['skills']['summon']['summon_mob'] : undefined
        let spawns  = obj['skills']['summon']['spawn_mob'] ? obj['skills']['summon']['spawn_mob'] : undefined

        card.innerHTML = '';

        card.innerHTML = 
        `<div class="card">
            <div class="top">

                <div class="image">
                    <div class="name">
                        <h3>${name}</h3>
                        <h4><span class="id">${id}</span></h4>
                    </div>
                    <div class="img">
                        <img src="${img}" alt="${name}">
                    </div>
                    <div class="info">
                        <h5><span class="size">${size}</span></h5>
                        <h5><span class="race">${race}</span></h5>
                        <h5><span class="type">${type} <span class="power">${epow}</span></span></h5>
                    </div>
                </div>

                <div class="stats">
                    <div class="heading">
                        <h6>Main Stats</h6>
                    </div>
                    <div class="stat-info">
                        <table class="tbl-attr">
                            <tr>
                                <th><p>AGI</p></th>
                                <th><p>DEX</p></th>
                                <th><p>VIT</p></th>
                                <th><p>INT</p></th>
                                <th><p>LUK</p></th>
                            </tr>
                            <tr>
                                <td><p>${attr['agi']}</p></td>
                                <td><p>${attr['dex']}</p></td>
                                <td><p>${attr['vit']}</p></td>
                                <td><p>${attr['int']}</p></td>
                                <td><p>${attr['luk']}</p></td>
                            </tr>
                        </table>

                        <table class="tbl-stat">
                            <tbody>
                                <tr>
                                    <th><p>Level</p></th>
                                    <td><p>${stats['level']}</p></td>
                                    <th><p>HP</p></th>
                                    <td><p>${showTrimmed(stats['hp'])}</p></td>
                                </tr>

                                <tr>
                                    <th><p>Attack</p></th>
                                    <td><p>${showTrimmed(stats['attack'])}</p></td>
                                    <th><p>ASPD</p></th>
                                    <td><p>${stats['aspd']}</p></td>
                                </tr>

                                <tr>
                                    <th><p>Def</p></th>
                                    <td><p>${formatDef(showTrimmed(stats['def']))}</p></td>
                                    <th><p>MDef</p></th>
                                    <td><p>${formatMDef(showTrimmed(stats['m_def']))}</p></td>
                                </tr>

                                <tr>
                                    <th><p>Range</p></th>
                                    <td><p>${stats['range']}</p></td>
                                    <th><p>Move Speed</p></th>
                                    <td><p>${stats['move_speed']}</p></td>
                                </tr>

                                <tr>
                                    <th><p>Base XP</p></th>
                                    <td><p>${showTrimmed(stats['base_exp'])}</p></td>
                                    <th><p>Job XP</p></th>
                                    <td><p>${showTrimmed(stats['job_exp'])}</p></td>
                                </tr>

                                <tr>
                                    <th><p>Base XP/HP</p></th>
                                    <td><p>${stats['base_exp_per_hp']}</p></td>
                                    <th><p>Job XP/HP</p></th>
                                    <td><p>${stats['job_exp_per_hp']}</p></td>
                                </tr>

                                <tr>
                                    <th><p>Hit</p></th>
                                    <td><p>${stats['hit']}</p></td>
                                    <th><p>Flee</p></th>
                                    <td><p>${stats['flee']}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="elemental">
                    <div class="heading">
                        <h6>Elemental</h6>
                    </div>
                    <div class="elem-info">
                        <table class="tbl-elem">
                            <tbody>
                                <tr>
                                    <th><p>Fire</p></th>
                                    <td><p class='${elemFormat(elem['fire'])}'>${elem['fire']}%</p></td>
                                    <th><p>Neutral</p></th>
                                    <td><p class='${elemFormat(elem['neutral'])}'>${elem['neutral']}%</p></td>
                                </tr>
                                <tr>
                                    <th><p>Water</p></th>
                                    <td><p class='${elemFormat(elem['water'])}'>${elem['water']}%</p></td>
                                    <th><p>Holy</p></th>
                                    <td><p class='${elemFormat(elem['holy'])}'>${elem['holy']}%</p></td>
                                </tr>
                                <tr>
                                    <th><p>Wind</p></th>
                                    <td><p class='${elemFormat(elem['wind'])}'>${elem['wind']}%</p></td>
                                    <th><p>Shadow</p></th>
                                    <td><p class='${elemFormat(elem['shadow'])}'>${elem['shadow']}%</p></td>
                                </tr>
                                <tr>
                                    <th><p>Earth</p></th>
                                    <td><p class='${elemFormat(elem['earth'])}'>${elem['earth']}%</p></td>
                                    <th><p>Ghost</p></th>
                                    <td><p class='${elemFormat(elem['ghost'])}'>${elem['ghost']}%</p></td>
                                </tr>
                                <tr>
                                    <th><p>Poison</p></th>
                                    <td><p class='${elemFormat(elem['poison'])}'>${elem['poison']}%</p></td>
                                    <th><p>Undead</p></th>
                                    <td><p class='${elemFormat(elem['undead'])}'>${elem['undead']}%</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="modes">
                        <ul>
                        ${returnModes(modes)}
                        </ul>
                    </div>
                </div>

            </div>

            <div class="bottom">

                <div class="skills">
                    ${returnSkills(skills)}
                </div>

                <div class="drops">
                    ${returnDrops(drops)}
                </div>

                <div class="maps">
                    ${returnMaps(maps)}
                </div>

                <div class="summons">
                    <div class="heading">
                        <h6>Summons</h6>
                    </div>
                    <div class="summon-info">
                        <div class="sum-mob">
                            ${returnSummons(summons)}
                        </div>
                        <div class="spw-mob">
                            ${returnSpawns(spawns)}
                        </div>
                    </div>
                </div>

            </div>
        </div>`
    }

    button.addEventListener('click', () => {
        fetch(getValues(url))
        .then((resp) => {
            if(!resp.ok) {
                alert(resp.status)
            }
            return resp.json()
        })
        .then(resp => showInfo(resp, card))
    });
})

