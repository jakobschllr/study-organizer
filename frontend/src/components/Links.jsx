const Links = ({links, addNewLink, deletingLinks, handleLinkDeletion}) => {
    if (deletingLinks) {
        let ids = []
        return (
            <div className="links">
                <div className="links-button">
                    <button className="edit-links-button" onClick={() => handleLinkDeletion(ids)}>Done</button>
                </div>
                <div className="link-buttons">
                    {links.map(l => 
                        <div className="link-wrapper">
                            <a className="link" title={l.name} onClick={(e) => ids = checkLink(ids, l.id, e)} >{l.name}</a>
                        </div>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className="links">
                <div className="edit-link-buttons">
                    <button className="edit-links-button" onClick={() => addNewLink()}>New Link</button>
                    <button className="edit-links-button" onClick={() => handleLinkDeletion([])}>Delete Links</button>
                </div>
                <div className="link-buttons">
                    {links.map(l => 
                        <div key={l.name} className="link-wrapper">
                            <a className="link" href={l.url} title={l.name}>{l.name}</a>
                        </div>
                    )}
                </div>
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