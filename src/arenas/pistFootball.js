import { ActionManager, Color3, CubeTexture, ExecuteCodeAction, MeshBuilder, NativeXRFrame, PhysicsAggregate, PhysicsMotionType, PhysicsShapeType, SceneLoader, StandardMaterial, Texture, TransformNode, Vector3 } from "@babylonjs/core";

import arenaModelUrl from "../../assets/models/terrainfoot.glb";
import skybox_nz from "../../assets/images/footballSky/redeclipse_nz.jpg";
import skybox_py from "../../assets/images/footballSky/redeclipse_py.jpg";
import skybox_px from "../../assets/images/footballSky/redeclipse_px.jpg";
import skybox_pz from "../../assets/images/footballSky/redeclipse_pz.jpg";
import skybox_ny from "../../assets/images/footballSky/redeclipse_ny.jpg";
import skybox_nx from "../../assets/images/footballSky/redeclipse_nx.jpg";
class ArenaFootball {
    scene;
    x;
    y;
    z;

    gameObject;
    meshAggregate




    constructor(x, y, z, scene) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.scene = scene || undefined;

        this.gameObject = new TransformNode("arena", scene);
        this.gameObject.position = new Vector3(0, 0, 0)
    }
    async init() {
        const skybox = MeshBuilder.CreateBox("skyBox", { size: 700 }, this.scene);
        const skyboxMaterial = new StandardMaterial("skyBox", this.scene);
        skyboxMaterial.backFaceCulling = false;
        const files = [
            skybox_nz,
            skybox_py,
            skybox_px,
            skybox_pz,
            skybox_ny,
            skybox_nx
        ];


        skyboxMaterial.reflectionTexture = new CubeTexture("", this.scene, null, false, files);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        this.scene.collisionsEnabled = true;

        const result = await SceneLoader.ImportMeshAsync("", "", arenaModelUrl, this.scene);

        /*skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new CubeTexture("../assets/images/redeclipse", this.scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);*/

        // Ajustement de l'échelle de la texture pour couvrir une face entière du skybox
        skyboxMaterial.reflectionTexture.uScale = -1; // Inverse l'échelle horizontale pour éviter les effets de miroir
        skyboxMaterial.reflectionTexture.vScale = 1; // Laisse l'échelle verticale à 1 pour ne pas étirer la texture

        //skybox.material = skyboxMaterial;
        //console.log(result);
        this.gameObject = result.meshes[0];
        this.gameObject.name = "arena";
        this.gameObject.setParent(null);
        this.gameObject.scaling.scaleInPlace(2);
        var i = 0;
        for (let childMesh of result.meshes) {
            i++;
            if (childMesh.getTotalVertices() > 0) {
                if (i == 8 || i == 9 || i == 10 || i == 11)
                    childMesh.isVisible = false;
                const meshAggregate = new PhysicsAggregate(childMesh, PhysicsShapeType.MESH, { mass: 0, friction: 0.2, restitution: 0 });
                meshAggregate.body.setMotionType(PhysicsMotionType.STATIC);
            }
        }

    }

    setCollisionZones(playerMesh) {
        this.zoneSable.actionManager = new ActionManager(this.scene);
        this.zoneSable.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnIntersectionEnterTrigger,
                    parameter: playerMesh,
                },
                (actionEv) => {
                    //this.actionOnPlayer(playerMesh);
                    console.log("actionManager sable ");
                }
            )
        );
    }
    actionOnPlayer(playerMesh) {
        //console.log("collision detected");
        playerMesh.speedZ = 0;
        playerMesh.speedX = 0;
    }


    update(delta) {

    }
}

export default ArenaFootball;