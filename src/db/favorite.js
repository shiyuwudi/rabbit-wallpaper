const FAVORITE_KEY = 'rabbit-wallpaper-favorite';

function list() {
    let saved = localStorage.getItem(FAVORITE_KEY);
    if (!saved) {
        saved = [];
    } else {
        try {
            saved = JSON.parse(saved);
        } catch (e) {
            saved = [];
        }
    }
    return saved;
}

function add (dataObj) {
    const saved = list();
    const newValue = JSON.stringify([...saved, dataObj]);
    localStorage.setItem(FAVORITE_KEY, newValue);
}

function remove(dataObj) {
    let saved = list();
    saved = saved.filter(obj => obj.di !== dataObj.di);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(saved));
}

export const favorite = {
    add,
    remove,
    list,
};
