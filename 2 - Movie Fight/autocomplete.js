


function createAutoComplete( {root, renderOption, onOptionSelect, inputValue, fetchData } ){
    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content">
            </div>
        </div>    
    </div>  `;

    const input = root.querySelector('input')
    const drdownContent = root.querySelector('.dropdown-content')
    const dropdown = root.querySelector('.dropdown')

    async function onInput(evt){
//        console.log(evt.target.value)
        const items = await fetchData(evt.target.value)
        if(!items.length)
        return;
        

        drdownContent.innerHTML=''
        dropdown.classList.add('is-active')
        for(let item of items){
            const option = document.createElement('a')
            option.classList.add('dropdown-item')

            option.innerHTML = renderOption(item)

            drdownContent.appendChild(option)

            option.addEventListener('click',() => {
                dropdown.classList.remove('is-active')
                input.value = inputValue(item)
                onOptionSelect(item)
            });

        }
        
    };


    document.addEventListener('click', (e) => {
        if(!(root.contains(e.target)))
            dropdown.classList.remove('is-active');
    });

    input.addEventListener('input', debounce(onInput,1000));

}