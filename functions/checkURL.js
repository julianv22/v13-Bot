module.exports = (client) => {
    client.checkURL = async (strInput) => {
        try {
            if (strInput) {
                var res = strInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                return (res !== null);
            } else return;
        } catch (err) {
            console.error(err);
        };
    }
}