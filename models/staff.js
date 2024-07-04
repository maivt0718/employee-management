class Staff{
    tknv = "";
    name = "";
    email = "";
    password = "";
    datepicker = "";
    luongCB = "";
    chucvu = "";
    gioLam = "";
    xeploai = "";

    calSalary = () => {
        switch (this.chucvu) {
            case "boss":
                return this.luongCB * 3
            case "coo":
                return this.luongCB * 2
            default:
                return this.luongCB;
        }
    }

    classify = () => {
        switch (true) {
            case this.gioLam >= 192:
                this.xeploai = "Excellent"
                return "Excellent"
            case this.gioLam >= 176:
                this.xeploai = "Very good"
                return "Very good"
            case this.gioLam >= 160:
                this.xeploai = "good"
                return "good"
            default:
                this.xeploai = "average"
                return "average";
        }
    }

}