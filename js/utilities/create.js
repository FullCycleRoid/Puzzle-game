





function create(el, className, child, parent, ...dataAttrs) {

    let element = null;
    try {
        element = document.createElement(el);
    } catch {
        throw new Error('Invalid HTMl tag name');
    }

    if (className) {
        element.classList.add(className);
    }

    if (child) {
        element.appendChild(child);
    }

    if (parent) {
        parent.appendChild(element);
        return parent;
    }


    return element;
}