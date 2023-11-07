window.addEventListener('load', function() {
    const corsProxy = 'https://corsproxy.io/?'              // CORS proxy
    const url = 'https://ragnapi.com/api/v1/'               // URL
    const version = document.getElementById('version')      // old-times, re-newal, re-start
    const search = document.getElementById('search')        // monsters or items 
    const data = document.getElementById('data')            // monster or item ID
    const button = document.getElementById('button')        // Button
    const card = document.querySelector('.information')     // Card
    const modal = document.getElementById('modalMain')      // Modal
    
    /*
    * @args     {string} url - Takes a URL as string
    * @returns  {string}     - Returns a formatted URL as string 
    */
    function getValues(url) {
        let p = corsProxy
        let v = version.value
        let s = search.value
        let d = data.value
        return p + url + v + '/' + s + '/' + d
    }

    function showTrimmed(val) {
        let v = val
        if(!isNaN(v)) return v

        v = v.replace(/\,/g,'')
        v = v.replace(/ /g, '')
        v = v.replace(/~/g, '-')
        return v
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

    function elemFormat(val) {
        return val > 100 ? 'great' : val < 0 ? 'less' : 'none'
    }

    /* Functions to return data from received objects */

    function returnImage(obj) {
        let a = ''

        const id   = obj['monster_id']
        const name = capitalizeAll(obj['monster_info'])
        const race = capitalizeAll(obj['race'])
        const size = firstLetter(obj['size'])
        const type = firstLetter(obj['type'])
        const epow = obj['element_power']
        const img  = obj['gif']
        
        a +=
        `<div class="name">
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
        </div>`

        return a
    }

    function returnStats(obj,version) {
        let a = ''

        const attr  = obj['main_atb']
        const stats = obj['main_stats']
        
        a +=
        `<div class="stats">
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
                        </tr>`

                        switch (version) {
                            case 'old-times':
                                a+=
                                `<tr>
                                    <th><p>Def</p></th>
                                    <td><p>${showTrimmed(stats['def'])}</p></td>
                                    <th><p>MDef</p></th>
                                    <td><p>${showTrimmed(stats['m_def'])}</p></td>
                                </tr>
                                <tr>
                                    <th><p>Magic Attack</p></th>
                                    <td><p>${showTrimmed(stats['magic_attack'])}</p></td>
                                    <th><p>Move Speed</p></th>
                                    <td><p>${stats['move_speed']}</p></td>
                                </tr>`
                                break

                            case 're-newal':
                                a+=
                                `<tr>
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
                                </tr>`
                                break
                            
                            case 're-start':
                                a+=
                                `<tr>
                                    <th><p>Def</p></th>
                                    <td><p>${showTrimmed(stats['def'])}</p></td>
                                    <th><p>MDef</p></th>
                                    <td><p>${showTrimmed(stats['m_def'])}</p></td>
                                </tr>
                                <tr>
                                    <th><p>Range</p></th>
                                    <td><p>${stats['range']} cell</p></td>
                                    <th><p>Move Speed</p></th>
                                    <td><p>${stats['move_speed']}</p></td>
                                </tr>`
                                break
                        
                            default:
                                a+=
                                `<tr>
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
                                </tr>`
                                break
                        }

                    a+= `<tr>
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
        </div>`

        return a
    }

    function returnElemental(obj) {
        let a = ''

        const elem  = obj['elementalDamage']
        
        a +=
        `<div class="heading">
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
        </div>`

        return a
    }

    function returnModes(obj) {
        let a = ''

        const modes = obj['skills']['mode']

        a += '<ul>'
        for (let i = 0; i < modes.length; i++) {
            a += `<li>${firstLetter(splitStr(modes[i]))}</li>`
        }
        a += '</ul>'
        return a
    }

    function returnSkills(obj) {
        let a = ''

        const skills  = obj['skills']['spell']

        if(skills.length < 1) {
            a += `<div class="heading">
                    <h6>Skills</h6>
                </div>
                <div class="skill-info">
                    <ul>
                        <li>No skills found for this monster</li>`
        } else {
            a += `<div class="heading">
                    <h6>Skills (${skills.length} ${skills.length < 2 ? `skill` : `skills`})</h6>
                </div>
                <div class="skill-info">
                    <ul>`
            for (let i = 0; i < skills.length; i++) {
                let skill_level = skills[i]['level'] !== null ? skills[i]['level'] : 'X'
                let skill_name = skills[i]['name'] !== '' ? skills[i]['name'] : 'unknown_skill'
                a += `<li>LV ${skill_level} ${capitalizeAll(skill_name)}</li>`
            }
        }
        a += `</ul>
            </div>`
        return a
    }
    
    function returnDrops(obj) {
        let u = 'https://db.irowiki.org/db/item-info/'
        let a = ''

        const drops = obj['drops']

        if(drops.length < 1) {
            a += `<div class="heading">
                    <h6>Drops</h6>
                </div>
                <div class="drop-info">
                    <ul>
                        <li><p class="drop-name">No drops found for this monster</p></li>`
        } else {
            a += `<div class="heading">
                    <h6>Drops (${drops.length} ${drops.length < 2 ? `drop` : `drops`})</h6>
                </div>
                <div class="drop-info">
                    <ul>`
            for (let i = 0; i < drops.length; i++) {
                let item_id = drops[i]['img'].split('/')[5].split('.')[0]
                let item_link = u + item_id + '/'
                let item_img = drops[i]['img']
                let item_name = drops[i]['name'] !== '' ? drops[i]['name'] : 'unknown_item'
                let item_rate = drops[i]['rate'] !== null ? drops[i]['rate'] !== '?' ? drops[i]['rate'] : 'X' : 'X'
                //let item_fetch = fetch(corsProxy + url + version.value + '/items/' + item_id)
                a += `<li>
                        <div class="drop-img">
                            <img src="${item_img}" alt="${drops[i]['name']}">
                        </div>
                        <p class="drop-name">
                            <a target='_blank' href='${item_link}'>${capitalizeAll(item_name)}</a>
                            <button id="${item_id}" class="drop-info-bttn">i</button>
                        </p>
                        <p class="drop-rate">${showTrimmed(item_rate)}%</p>
                    </li>`
            }
        }
        a += `</ul>
            </div>`
        return a
    }

    function returnMaps(obj) {
        
        let u = 'https://db.irowiki.org/db/map-info/'
        let a = ''

        const maps = obj['maps']

        if(maps.length < 1) {
            a += `<div class="heading">
                    <h6>Maps</h6>
                </div>
                <div class="map-info">
                    <ul>
                        <li><p class="map-name">No maps found for this monster</p></li>`
        } else {
            a += `<div class="heading">
                    <h6>Maps (${maps.length} ${maps.length < 2 ? `map` : `maps`})</h6>
                </div>
                <div class="map-info">
                    <ul>`
            for (let i = 0; i < maps.length; i++) {
                let map_id = u + maps[i]['img'].split('/')[6].split('.')[0] + '/'
                let map_name = (maps[i]['name'] !== '' ? maps[i]['name'] : 'unknown_map') + ' ' + maps[i]['number']
                let map_img = maps[i]['img']
                let map_type = maps[i]['type'] !== '' ? maps[i]['type'] : 'unknown'
                let map_amt = maps[i]['amount'] !== null ? maps[i]['amount'] : 'X'
                let map_freq = maps[i]['frequency'] !== '' ? maps[i]['frequency'] : 'unknown_frequency'
                a += `<li>
                        <div class="map-name">
                            <p>
                                <a target='_blank' href='${map_id}'>${capitalizeAll(map_name)}</a>
                            </p>
                        </div>
                        <div class="map-details">
                            <div class="m-img">
                                <img src="${map_img}" alt="${map_name}">
                            </div>
                            <div class="m-txt">
                                <p class="m-type">${map_type.toUpperCase()}</p>
                                <p class="m-freq">${map_amt}, ${capitalizeAll(map_freq)}</p>
                            </div>
                        </div>
                    </li>`
            }
        }
        a += `</ul>
            </div>`
        return a
    }

    function returnSummonsAndSpawns(obj) {
        let a = ''

        const summons = obj['skills']['summon']['summon_mob'] ? obj['skills']['summon']['summon_mob'] : undefined
        const spawns = obj['skills']['summon']['spawn_mob'] ? obj['skills']['summon']['spawn_mob'] : undefined

        if(summons === undefined || summons.length < 1) {
            a += `<div class="sum-mob">
                    <h6>Summon Mob</h6>
                        <ul>
                            <li>No summons found</li>`
        } else {
            a += `<div class="sum-mob">
                    <h6>Summon Mob (${summons.length} ${summons.length < 2 ? `summon` : `summons`})</h6>
                        <ul>`
            for(let i = 0; i < summons.length; i++) {
                let summon_name = summons[i][1] !== '' ? summons[i][1] : 'unknown_summon'
                let summon_amt = summons[i][0] !== null ? summons[i][0] : 'X'
                a += `<li>${capitalizeAll(summon_name)} (${summon_amt})<li>`
            }
        }
        a += `</ul>
            </div>`
        
        if(spawns === undefined || spawns.length < 1) {
            a += `<div class="spw-mob">
                    <h6>Spawn Mob</h6>
                        <ul>
                            <li>No spawns found</li>`
        } else {
            a += `<div class="spw-mob">
                    <h6>Spawn Mob (${spawns.length} ${spawns.length < 2 ? `spawn` : `spawns`})</h6>
                        <ul>`
            for(let i = 0; i < spawns.length; i++) {
                let spawn_name = spawns[i][1] !== '' ? spawns[i][1] : 'unknown_spawn'
                let spawn_amt = spawns[i][0] !== null ? spawns[i][0] : 'X'
                a += `<li>${capitalizeAll(spawn_name)} (${spawn_amt})<li>`
            }
        }
        a += `</ul>
            </div>`
        return a
    }

    function showMonsterInfo(obj,card) {
        if(obj === null) {
            card.innerHTML = ''
            card.innerHTML =
            `<div class="card error">
                <h3>Not Found!</h3>
            </div>`
            return
        }

        let v = version.value

        card.innerHTML = ''
        card.innerHTML += 
        `<div class="card">
            <div class="top">

                <div class="image">
                    ${returnImage(obj)}
                </div>

                <div class="stats">
                    ${returnStats(obj,v)}
                </div>

                <div class="elemental">
                    ${returnElemental(obj)}

                    <div class="modes">
                        ${returnModes(obj)}
                    </div>
                </div>

            </div>

            <div class="bottom">

                <div class="skills">
                    ${returnSkills(obj)}
                </div>

                <div class="drops">
                    ${returnDrops(obj)}
                </div>

                <div class="maps">
                    ${returnMaps(obj)}
                </div>

                <div class="summons">
                    <div class="heading">
                        <h6>Summons & Spawns</h6>
                    </div>
                    <div class="summon-info">
                        ${returnSummonsAndSpawns(obj)}
                    </div>
                </div>

            </div>
        </div>`
    }

    /* Modal functions */

    function showItemModal(id) {
        if(modal.style.display === 'none') {
            modal.style.display = 'block'
        } else {
            modal.style.display = 'none'
        }
    }

    function closeModal() {
        if(modal.style.display === 'block') {
            modal.style.display = 'none'
        } else {
            modal.style.display = 'block'
        }
    }

    function addItemInfoEventListeners() {
        const infoBttns = document.querySelectorAll('.drop-info-bttn')
        infoBttns.forEach(infoBttn => {
            infoBttn.addEventListener('click',function(e) {
                e.preventDefault()
                showItemModal(this.id)
            })
        })
    }

    function getDetails() {
        fetch(getValues(url))
        .then((resp) => {
            if(resp.ok) {
                return resp.text()
            }
        })
        .then((text) => {
            return text.length ? JSON.parse(text) : null
        })
        .then((json) => {
            showMonsterInfo(json,card)
            addItemInfoEventListeners()
        })
        .catch((error) => {
            throw error
        })
    }

    button.addEventListener('click', getDetails)
})

const item = {
    "_id":"60f74d106e46120bdf73f093",
    "id":1012,
    "name":"frill",
    "description":"Some skin from the neck of a lizard which lives in the desert.",
    "img":"http://db.irowiki.org/image/item/1012.png",
    "skills":[],
    "size_modifier":[],
    "drop_rate":[
        {
            "monster":"Driller",
            "rate":"100.00%",
            "highest_spawn":"45 at Einbroch Field 02",
            "element":"Earth 1",
            "flee":"187",
            "hit":"138"
        },
        {
            "monster":"Frilldora",
            "rate":"82.44%",
            "highest_spawn":"25 at Sograt Desert 17",
            "element":"Fire 1",
            "flee":"158",
            "hit":"80"
        }],
    "equipable":{
    }
}