exports.verificationMesage = (name, verificationUrl) => {
	return `<div style="display:flex; justify-content: center; align-items: center ; color: black ; ">
        <div
            style="display: flex; justify-content: center;border: 2px solid black; width: auto; height: auto; padding: 5px; background-color: rgb(22, 214, 248); border-radius: 5px ; ;">
            <div style="text-align: center ;">
                <h1>Verify Account</h1>
                <h3>Hi <h1>${name}</h1> Welcome to Task Manager</h3>

                <p>
                    A verify account event has been triggered. The verify account window is limited to ONE HOUR.

                <p>
                    If you do not verify your account within ONE HOUR , you will need to submit a new request from your profile tab.
                </p>

                To verify account visit the following link:

                </p>
                <a href=${verificationUrl} style="border: 2px solid black ;padding: 7px ; border-radius: 15px; text-decoration: none ;background-color: rgb(40, 242, 13);
                color: black;
                    font-weight: bold;">Verify
                    Account</a>
                <p>if this button does not work click on the below link</p>
                <p><span>Link: </span> <a href=${verificationUrl}>
                       ${verificationUrl}</a>
                </p>
            </div>
        </div>
    </div>`;
};

exports.createMailBody = message => {
	return `<div style="display:flex; justify-content: center; align-items: center ; color: black ; ">
        <div
            style="display: flex; justify-content: center;border: 2px solid black; width: auto; height: auto; padding: 5px;  border-radius: 5px ; ;">
            <div style="text-align: center ;">
                ${message}
            </div>
        </div>
    </div>`;
};
