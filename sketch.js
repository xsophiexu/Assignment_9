// ml5 mask, https://creativecoding1133c.wordpress.com/2020/11/12/lecture-10-libraries-ml5/
let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  
  // Hook up poseNet
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

//poses is an array containing pose objects
function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    print(pose);
    let earR = pose.rightEar;
    let earL = pose.leftEar;
    let d = dist(earR.x, earR.y, earL.x, earL.y);
    // We use the difference between the ears as the size of the mask
    fill(255, 0, 0, 50);
    ellipse(pose.nose.x, pose.nose.y, d, d*1.25);
    
    //fill(0, 0, 255);
    //ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    //ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    //ellipse on each keypoint
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      if (pose.keypoints[i].score > .5) {
        ellipse(x, y, 16, 16);
      }
    }
}
}
