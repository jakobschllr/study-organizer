const Links = ({links, addNewLink, deletingLinks, handleLinkDeletion}) => {
    console.log(links)
    if (deletingLinks) {
        let ids = []
        return (
            <div className="links">
                {links.map(l => 
                    <div className="link-wrapper">
                        <a className="link" title={l.name} onClick={(e) => ids = checkLink(ids, l.id, e)} ><img alt={l.name} src={'http://www.google.com/s2/favicons?domain=' + l.url} /></a>
                    </div>
                )}
                <button className="regular-button" onClick={() => handleLinkDeletion(ids)}>Done</button>
            </div>
        )
    } else {
        return (
            <div className="links">
                {links.map(l => 
                    <div key={l.name} className="link-wrapper">
                        <a className="link" href={l.url} title={l.name}><img alt={l.name} src={'http://www.google.com/s2/favicons?domain=' + l.url} /></a>
                    </div>
                )}
                <button className="regular-button" onClick={() => addNewLink()}>New Link</button>
                <button className="regular-button" onClick={() => handleLinkDeletion([])}>Delete Links</button>
            </div>
        )
    }
}

function checkLink (linkList, id, element) {
    if (linkList.includes(id)) {
        const updatedList = linkList.filter(l => l !== id)
        element.target.style.border = '0px solid red'
        return updatedList
    }
    else {
        const updatedList = linkList
        updatedList.push(id)
        element.target.style.border = '2px solid red'
        return updatedList
    }
}

export default Links