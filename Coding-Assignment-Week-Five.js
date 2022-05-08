class Adventurer {
    constructor(name, role, armor, strength, agility, intellect){
        this.name = name;
        this.role = role;
        this.armor = armor;
        this.strength = strength;
        this.agility = agility;
        this.intellect = intellect;
    }

    describe() {
        return`${this.name} is a mighty ${this.role} with protective ${this.armor}`;
    }
}

class Dungeon_Group {
    constructor(name){
        this.name = name;
        this.adventurer = [];
    }

    addAdventurer(adventurer){
        if (adventurer instanceof Adventurer){
            this.adventurer.push(adventurer);
        } else {
            throw new Error(`${adventurer} tis not an adventurer! Try again hero!`)
        }
    }

    describe(){
        return`The cohort of wayward venturers known as ${this.name} include the hero ${this.adventurer}`;
    }
}

class Menu {
    constructor(){
        this.dungeonGroup = [];
        this.selectedGroup = null;

    }
    start(){
        let selection = this.showMainMenuOptions();

        while(selection != 0){
            switch (selection) {
                case `1`: 
                    this.createGroup();
                    break;
                case `2`:
                    this.viewGroup();
                    break;
                case `3`:
                    this.disbandGroup();
                    break;
                case `4`:
                    this.displayCompetition();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();

        }
        alert(`Farwell!`);
    }

    showMainMenuOptions(){
        return prompt(`
        0) retreat!
        1) create group
        2) view group
        3) disband group
        4) display competition
        `);
    }

    showGroupMenuOptions(groupInfo){
        return prompt(`
        0) return
        1) create adventurer
        2) delete adventurer
        ------------------------
        ${groupInfo}
        `)
    }

    displayCompetition(){
        let competitionString = '';
        for(let i = 0; i < this.dungeonGroup.length; i++){
            competitionString += i + ') ' + this.dungeonGroup[i].name + '\n';
        }
        alert(competitionString);
    }

    createGroup(){
        let name = prompt('Enter the name of ye party:');
        this.dungeonGroup.push(new Dungeon_Group(name));
    }

    viewGroup() {
        let index = prompt('Enter the index of the group to view them');
        if (index > -1 && this.dungeonGroup.length){
            this.selectedGroup = this.dungeonGroup[index];
            let description = 'Group Name: ' + this.selectedGroup.name + '\n';

            for  (let i = 0; i < this.selectedGroup.adventurer.length; i++){
                description += i + ') Hero name: ' + 
                this.selectedGroup.adventurer[i].name + '   Role: ' + 
                this.selectedGroup.adventurer[i].role + '   Armor Type: ' + 
                this.selectedGroup.adventurer[i].armor +'\n' + 'Strength, ' +
                this.selectedGroup.adventurer[i].strength + '  Agility, ' +
                this.selectedGroup.adventurer[i].agility + '  Intellect, ' +
                this.selectedGroup.adventurer[i].intellect + '\n'
            }
            let selection = this.showGroupMenuOptions(description)
            switch (selection){
                case '1' :
                    this.createAdventurer(); 
                    break;
                case '2' :
                    this.deleteAdventurer();
            }
        }
    }

    createAdventurer(){
        let name = prompt('Enter your adventurers name:');
        let role = prompt("What is your hero's role:");
        let armor = prompt("What is your hero's armor type:");
        alert("Your 10 ability points will be randomly assigned. \n Strength, Agility, Intellect \n ----------------------- \n View group to see hero stats");
        
            function randomPointsGenerator(min, max) {
                return Math.floor(Math.random() * (max - min) ) + min;
            }

        let strength = randomPointsGenerator(1, 9);
        let unofficalAgility = 10 - strength
        let agility = randomPointsGenerator(1, unofficalAgility);
        let intellect = 10 - (agility + strength);
        console.log(strength, agility, intellect);
        /* In the code above, I am creating a function that will randomly assign a number betwen min and max. Once this is accomplished, I am assigning the strength
        variable to be a number between 1 and 8 (It says 9 but that number is excluded in this function setup.) 
        
        After the random number is assigned to strenth I want to assign the remaining points randomly between agility and intellect. */

        this.selectedGroup.adventurer.push(new Adventurer(name, role, armor, strength, agility, intellect));
    }
    
    deleteAdventurer(){
        let index = prompt('Enter the index of the adventurer you wish to delete:');
        if(index > -1 && index < this.selectedGroup.adventurer.length){
            this.selectedGroup.adventurer.splice(index, 1);
        }
    }

    disbandGroup(){
        let index = prompt('Enter the index of the group you wish to disband:');
        if(index > -1 && index < this.dungeonGroup.length){
            this.dungeonGroup.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();

