function descriptionBreak(description) {
    if (description.length > 100) {
        return description.substr(0, 100) + "...";
    } else {
        return description
    }
}

export default descriptionBreak;