import { ActionManager, Color3, ExecuteCodeAction, Mesh, Sound, StandardMaterial, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";

class SandMalusManager {
    scene;
    localPlayer;
    room
    greenRects = [
        { position: [-115, 0.1, 16], rotation: [0, 0, 0], taille: [70, 7, 1] },
        { position: [-115, 0.1, 33.5], rotation: [0, 0, 0], taille: [200, 5, 1] },
        { position: [-115, 0.1, -102], rotation: [0, 0, 0], taille: [200, 5, 1] },
        { position: [-115, 0.1, -84], rotation: [0, 0, 0], taille: [70, 7, 1] },

        { position: [0.7, 0.1, -35], rotation: [0, Math.PI / 2, 0], taille: [13, 5, 1] },
        //{ position: [-3, 0.1, -13], rotation: [0, Math.PI / 3, 0], taille: [7, 4, 1] },
        //{ position: [-3.2, 0.1, -57], rotation: [0, -Math.PI / 3, 0], taille: [7, 4, 1] },
        //{ position: [-15, 0.1, 3], rotation: [0, Math.PI / 4, 0], taille: [10, 3, 1] },
        //{ position: [-15.2, 0.1, -73], rotation: [0, -Math.PI / 4, 0], taille: [10, 3, 1] },

        { position: [19, 0.1, -35], rotation: [0, Math.PI / 2, 0], taille: [24, 5, 1] },
        //{ position: [16, 0.1, -13], rotation: [0, Math.PI / 3, 0], taille: [7, 4, 1] },
        //{ position: [16.2, 0.1, -57], rotation: [0, -Math.PI / 3, 0], taille: [7, 4, 1] },
        //{ position: [7, 0.1, 3], rotation: [0, Math.PI / 3, 0], taille: [12, 3, 1] },
        //{ position: [7.2, 0.1, -73], rotation: [0, -Math.PI / 3, 0], taille: [12, 3, 1] },

        { position: [-228.3, 0.1, -35], rotation: [0, Math.PI / 2, 0], taille: [10, 5, 1] },
        //{ position: [-243, 0.1, -13], rotation: [0,  (2*Math.PI) / 3.2, 0], taille: [7, 4, 1] },
        //{ position: [-243, 0.1, -57], rotation: [0,  (-2*Math.PI)/ 3.2, 0], taille: [7, 4, 1] },
        //{ position: [-234, 0.1, 3], rotation: [0, (2*Math.PI) / 3, 0], taille: [10, 3, 1] },
        //{ position: [-234.2, 0.1, -73], rotation: [0,  (-2*Math.PI) / 3, 0], taille: [10, 3, 1] },

        { position: [-246, 0.1, -35], rotation: [0, Math.PI / 2, 0], taille: [24, 5, 1] },
        //{ position: [-224, 0.1, -13], rotation: [0, (2*Math.PI) / 3.2, 0], taille: [7, 4, 1] },
        //{ position: [-224, 0.1, -57], rotation: [0, (-2*Math.PI) / 3.2, 0], taille: [7, 4, 1] },  
        //{ position: [-212, 0.1, 3], rotation: [0,(2*Math.PI) / 2.55, 0], taille: [10, 3, 1] },
        //{ position: [-212.2, 0.1, -73], rotation: [0, (-2*Math.PI) / 2.55, 0], taille: [10, 3, 1] }
    ];


    constructor(scene, localPlayer, room) {
        this.scene = scene;
        this.localPlayer = localPlayer;
        this.room = room || null;

    }
    async createGreenArrow(positions, rotations, taille) {
        const greenRectangle = Mesh.CreateGround("greenRectangle", taille[0], taille[1], taille[2], this.scene);
        greenRectangle.position = new Vector3(positions[0], positions[1], positions[2]);
        greenRectangle.scaling = new Vector3(2.1, 1, 1);
        greenRectangle.rotation = new Vector3(rotations[0], rotations[1], rotations[2]);
        greenRectangle.material = new StandardMaterial("greenMat", this.scene);
        greenRectangle.material.diffuseColor = new Color3(0, 1, 1); // Vert
        greenRectangle.checkCollisions = true;
        greenRectangle.material.alpha = 0.5;
        greenRectangle.actionManager = new ActionManager(this.scene);
        greenRectangle.isVisible = false;

        greenRectangle.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: this.localPlayer.gameObject
                },
                () => {
                    this.localPlayer.setRunningSpeed(5);
                    this.localPlayer.setJumpImpulse(2);


                }
            )
        );

        greenRectangle.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnIntersectionExitTrigger,
                    parameter: this.localPlayer.gameObject
                },
                () => {
                    // Ensure the speed is reset when exiting the rectangle
                    this.localPlayer.setRunningSpeed(14);
                    this.localPlayer.setJumpImpulse(6);
                }
            )
        );
    }

    async createArrowsSand() {
        for (const greenPosition of this.greenRects) {
            await this.createGreenArrow(greenPosition.position, greenPosition.rotation, greenPosition.taille);
        }

    }


}


export default SandMalusManager;