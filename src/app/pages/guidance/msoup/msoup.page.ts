import { Component,ViewChild, OnInit } from '@angular/core';
import * as MediasoupClient from  'mediasoup-client'
import * as bowser from 'bowser';
import { Md5 } from 'ts-md5/dist/md5';
import { Router, ActivatedRoute } from '@angular/router';
import protooClient from 'protoo-client';
import {BaseService} from '../../../service/base.service'
import { UserService } from '../../../structs/user.service'
// import {UserService} from '../../../service/user.service'
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
declare var cordova:any;



@Component({
  selector: 'app-msoup',
  templateUrl: './msoup.page.html',
  styleUrls: ['./msoup.page.scss'],
})
export class MsoupPage implements OnInit {

	@ViewChild('myvideo') myVideo: any;  //取得myVideo的元素
	@ViewChild('myaudio') myaudio: any;  //取得myVideo的元素

	

   VIDEO_CONSTRAINS =
{
	qvga : { width: { ideal: 320 }, height: { ideal: 240 } },
	vga  : { width: { ideal: 640 }, height: { ideal: 480 } },
	hd   : { width: { ideal: 1280 }, height: { ideal: 720 } }
};

VIDEO_ENCODINGS =
[
	{ maxBitrate: 100000 },
	{ maxBitrate: 300000 },
	{ maxBitrate: 900000 }
];

EXTERNAL_VIDEO_SRC = './assets/1.mp4';

  // ortc = this._interopRequireWildcard(require("./ortc"));

  // _Device = this._interopRequireDefault(require("./Device"));

  // _Room = this._interopRequireDefault(require("./Room"));

  // internals = this._interopRequireWildcard(require("./internals"));

  _spy=true;
	_closed=false;
	Mic=true;
	_useSimulcast=false;
	roomId=this.router.snapshot.paramMap.get('roomId');//获取课程ID
  _micProducer:any;
  _peerName="mytest";
  _sendTransport=null;
  _recvTransport=null;
  _webcamProducer=null;
	_webcams=null;
	_consumers = new Map();
  _webcam =
		{
			device     : null,
			resolution : 'hd'
		};
  protooUrl:any;
  protooTransport:any;
  _protoo:any;
	_room:any;
	_mediasoupDevice:any;
	_forceTcp:false;
	_displayName:"Mr. Andson";
	_device:any;

  localStream:any;
	_externalVideo : any;
	_externalVideoStream:null;
	



  constructor(
    // private msoup:MediasoupClient,
	private baseService:BaseService,
	// private camera: Camera,
	private router: ActivatedRoute,
	private Router:Router,
	// private cameraPreview: CameraPreview,
	private userService: UserService,
  ) { 
    
    // let device=MediasoupClient.getDeviceInfo();
    let forceH264=false;
		// let peerName="alice";

		// this.baseService.myalert(JSON.stringify(userService.data));
		// this._displayName = "";
		this._device=this.deviceInfo();

		this.protooUrl = this.baseService.getProtooUrl(Md5.hashStr(userService.data.nickname).toString(), this.roomId, forceH264);
	// this.baseService.myalert(JSON.stringify(this._device));
		this.baseService.myalert(this.protooUrl)
		this.protooTransport = new protooClient.WebSocketTransport(this.protooUrl);
    this._protoo=new protooClient.Peer(this.protooTransport);
    let forceTcp=false;

			
			this._protoo.on('open', () =>
			{
				// logger.debug('protoo Peer "open" event');

				
				this._joinRoom();
			
			});

		// 	if (1==1)
		// {
		// 	this._externalVideo = document.createElement('video');
		// 	this._externalVideo.controls = true;
		// 	this._externalVideo.muted = true;
		// 	this._externalVideo.loop = true;
		// 	this._externalVideo.setAttribute('playsinline', '');
		// 	this._externalVideo.src = this.EXTERNAL_VIDEO_SRC;
		// 	this._externalVideo.play()
		// 	//	.catch((error) => logger.warn('externalVideo.play() failed:%o', error));
		// }

		this._protoo.on('failed', (e) =>
		{
			this.baseService.myalert("failed:"+JSON.stringify(e))
		});

		this._protoo.on('disconnected', () =>
		{


			// Close mediasoup Transports.
			if (this._sendTransport)
			{
				this._sendTransport.close();
				this._sendTransport = null;
			}

			if (this._recvTransport)
			{
				this._recvTransport.close();
				this._recvTransport = null;
			}

		
		});

		this._protoo.on('close', () =>
		{
			if (this._closed)
				return;

			this.close();
		});

		// eslint-disable-next-line no-unused-vars
		this._protoo.on('request', async (request, accept, reject) =>
		{

			switch (request.method)
			{
				case 'newConsumer':
				{
					const {
						peerId,
						producerId,
						id,
						kind,
						rtpParameters,
						type,
						appData,
						producerPaused
					} = request.data;

					let codecOptions;

					if (kind === 'audio')
					{
						codecOptions =
						{
							opusStereo : 1
						};
					}

					const consumer = await this._recvTransport.consume(
						{
							id,
							producerId,
							kind,
							rtpParameters,
							codecOptions,
							appData : { ...appData, peerId } // Trick.
						});

					// Store in the map.
					// this.baseService.myalert(consumer.kind)
					// this._consumers.set(consumer.id, consumer);




					if(consumer.kind=="audio"){
						this.baseService.myalert("audio")
						this.baseService.myalert(JSON.stringify(consumer))
						const stream = new MediaStream;
						stream.addTrack(consumer.track);
						// this.myVideo.srcObject=stream;
						this.baseService.myalert("audio")
						let remoteaudio=document.getElementById("remoteaudio");
						this.baseService.myalert("audio2")
						this.playVideo(remoteaudio, stream,"audio");
					}

					if(consumer.kind=="video"){
					this.baseService.myalert(JSON.stringify(consumer))
					const stream = new MediaStream;

					stream.addTrack(consumer.track);
					// this.myVideo.srcObject=stream;
					let remotevideo=document.getElementById("remotevideo");
					this.playVideo(remotevideo, stream);
				}

					consumer.on('transportclose', () =>
					{
						this._consumers.delete(consumer.id);
					});
				
					accept();
					// If audio-only mode is enabled, pause it.
					// if (consumer.kind === 'video' && store.getState().me.audioOnly)
					// 	this._pauseConsumer(consumer);

					// break;
				}
			}
		});
			
	  

		// this._join({ "displayName", device });

  }

  ngOnInit() {
  }

	hangDown(){
		this.close();
		history.go(-1);
	}


  startVideo() {
	
    this.getDeviceStream({video: true, audio: true})
	.then( (stream) =>{ // success
		
      this.localStream = stream;
	  let localVideo=document.getElementById("local_video");
			 this.playVideo(localVideo, stream);
			 this.logStream('localstream', stream);
		
    //   updateButtons();
    }).catch( (error)=> { // error
	  // console.error('getUserMedia error:', error);
	  // this.baseService.myalert('navigatorMMM9'+error);
      return;
	});
  }


  logStream(msg, stream) {
    console.log(msg + ': id=' + stream.id);
    let videoTracks = stream.getVideoTracks();
    if (videoTracks) {
    console.log('videoTracks.length=' + videoTracks.length);
    videoTracks.forEach(function(track) {
      console.log(' track.id=' + track.id);
    });
    }
    
    let audioTracks = stream.getAudioTracks();
    if (audioTracks) {
    console.log('audioTracks.length=' + audioTracks.length);
    audioTracks.forEach(function(track) {
      console.log(' track.id=' + track.id);
    });
    }
  }


 playVideo(element, stream,et="video") {
	 this.baseService.myalert("why play");
    if ('srcObject' in element) {
      element.srcObject = stream;
    }
    else {
      element.src = window.URL.createObjectURL(stream);
    }
		element.play();
		if(et=="video"){
		element.volume = 0;
		}else{
			this.baseService.myalert("audioppay0000");
			element.volume = 0.75;
		}
  }

getDeviceStream(option) {
    if ('getUserMedia' in navigator.mediaDevices) {
	return navigator.mediaDevices.getUserMedia(option);
    }
    else {
	  console.log('wrap navigator.getUserMadia with Promise');
      return new Promise(function(resolve, reject){    
        navigator.getUserMedia(option,
          resolve,
          reject
        );
      });      
    }
  }



	async _joinRoom()
	{
	this.baseService.myalert("bbq")
		try
		{
		
			try{
				this.baseService.myalert(1)
			this._mediasoupDevice = new MediasoupClient.Device();
		}catch(e){
			this.baseService.myalert(JSON.stringify(e))
		}
		this.baseService.myalert(2)
		let routerRtpCapabilities;
		try{
			 routerRtpCapabilities =
				await this._protoo.request('getRouterRtpCapabilities');
			}catch(e){
				this.baseService.myalert(JSON.stringify(e))
			}
				this.baseService.myalert(3)
			this.baseService.myalert("routerRtpCapabilities----"+JSON.stringify(routerRtpCapabilities));

		const temp =	await this._mediasoupDevice.load({ routerRtpCapabilities });
	
			if (!this._mediasoupDevice.canProduce('video'))
				{
					// alert('canot produce video');
					// alert(379998)
					// alert(this._mediasoupDevice.canProduce('video'))

					// Abort next steps.
				}else{
					// alert(378)
					// alert(this._mediasoupDevice.canProduce('video'))
				}



			// NOTE: Stuff to play remote audios due to browsers' new autoplay policy.
			//
			// Just get access to the mic and DO NOT close the mic track for a while.
			// Super hack!
			// {
			// 	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			// 	const audioTrack = stream.getAudioTracks()[0];



			// 	audioTrack.enabled = false;

			// 	setTimeout(() => audioTrack.stop(), 120000);
			// }

			// Create mediasoup Transport for sending (unless we are spy).
			if (this._spy)
			{
				this.baseService.myalert("not_spy")
				const transportInfo = await this._protoo.request(
					'createWebRtcTransport',
					{
						forceTcp  : this._forceTcp,
						producing : true,
						consuming : false
					});

				const {
					id,
					iceParameters,
					iceCandidates,
					dtlsParameters
				} = transportInfo;

				this._sendTransport = this._mediasoupDevice.createSendTransport(
					{
						id,
						iceParameters,
						iceCandidates,
						dtlsParameters
					});

				
				this._sendTransport.on(
					'connect', ({ dtlsParameters }, callback, errback) => // eslint-disable-line no-shadow
					{
						this._protoo.request(
							'connectWebRtcTransport',
							{
								transportId : this._sendTransport.id,
								dtlsParameters
							})
							.then(callback)
							.catch((E)=>{this.baseService.myalert("e1:"+JSON.stringify(E))});
					});
					this.baseService.myalert("produce:::1")
				this._sendTransport.on(
					'produce', async ({ kind, rtpParameters, appData }, callback, errback) =>
					{
						try
						{
							// eslint-disable-next-line no-shadow
							this.baseService.myalert("produce:::2")
							const { id } = await this._protoo.request(
								'produce',
								{
									transportId : this._sendTransport.id,
									kind,
									rtpParameters,
									appData
								});

							callback({ id });
						}
						catch (error)
						{
						alert("e1:"+JSON.stringify(error));
							errback(error);
						}
					});
			}
			// Create mediasoup Transport for receiving.
			this.baseService.myalert("receiving:::1")
			{
				const transportInfo = await this._protoo.request(
					'createWebRtcTransport',
					{
						forceTcp  : this._forceTcp,
						producing : false,
						consuming : true
					});

				const {
					id,
					iceParameters,
					iceCandidates,
					dtlsParameters
				} = transportInfo;


				// const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				// const webcamTrack = stream.getVideoTracks()[0];
				// this.baseService.myalert("stream112")
				// const webcamProducer = await this._sendTransport.produce({ track: webcamTrack });
				this.baseService.myalert("createRecvTransport:::1")
				this._recvTransport = this._mediasoupDevice.createRecvTransport(
					{
						id,
						iceParameters,
						iceCandidates,
						dtlsParameters
					});
					this.baseService.myalert("connect:::1")
				this._recvTransport.on(
					'connect', ({ dtlsParameters }, callback, errback) => // eslint-disable-line no-shadow
					{
						this._protoo.request(
							'connectWebRtcTransport',
							{
								transportId : this._recvTransport.id,
								dtlsParameters
							})
							.then(callback)
							.catch(errback);
					});
			}
			this.baseService.myalert("peers:::1")
			// Join now into the room.
			const { peers } = await this._protoo.request(
				'join',
				{
					displayName     : this._displayName,
					device          : this._device,
					rtpCapabilities : this._mediasoupDevice.rtpCapabilities
				});

			

				// this.baseService.myalert(JSON.stringify(peers))

			// store.dispatch(
			// 	stateActions.setRoomState('connected'));

			// // Clean all the existing notifcations.
			// store.dispatch(
			// 	stateActions.removeAllNotifications());

			// store.dispatch(requestActions.notify(
			// 	{
			// 		text    : 'You are in the room!',
			// 		timeout : 3000
			// 	}));
			// this.baseService.myalert("peers:"+peers.length)
			// for (const peer of peers)
			// {
			// 	// store.dispatch(
			// 	// 	stateActions.addPeer({ ...peer, consumers: [] }));
			// }

			// Enable mic/webcam.
			// if (this._spy)
			// {
				// Set our media capabilities.
				// store.dispatch(stateActions.setMediaCapabilities(
				// 	{
				// 		canSendMic    : this._mediasoupDevice.canProduce('audio'),
				// 		canSendWebcam : this._mediasoupDevice.canProduce('video')
				// 	}));
				this.baseService.myalert("doit:::1")
				this.enableWebcam();
				this.enableMic();

				// const devicesCookie = cookiesManager.getDevices();

				// if (!devicesCookie || devicesCookie.webcamEnabled || this._externalVideo)
				
			// }
		}
		catch (error)
		{
			// logger.error('_joinRoom() failed:%o', error);

			// store.dispatch(requestActions.notify(
			// 	{
			// 		type : 'error',
			// 		text : `Could not join the room: ${error}`
			// 	}));

			this.close();
		}
	}

deviceInfo()
{
	const ua = navigator.userAgent;
	const browser = bowser.getParser(ua);
	let flag;

	if (browser.satisfies({ chrome: '>=0', chromium: '>=0' }))
		flag = 'chrome';
	else if (browser.satisfies({ firefox: '>=0' }))
		flag = 'firefox';
	else if (browser.satisfies({ safari: '>=0' }))
		flag = 'safari';
	else if (browser.satisfies({ opera: '>=0' }))
		flag = 'opera';
	else if (browser.satisfies({ 'microsoft edge': '>=0' }))
		flag = 'edge';
	else
		flag = 'unknown';
	// let flag = 'unknown';
	return {
		flag,
		name    : "chrome",
		version : "6.3"
	};
}

OSMic(){
	if(this.Mic){
		this.Mic=false;
		this.disableMic();
	}else{
		this.Mic=true;
		this.enableMic();
	}
}

async disableWebcam()
	{
		

		if (!this._webcamProducer)
			return;

		this._webcamProducer.close();

	

		try
		{
			await this._protoo.request(
				'closeProducer', { producerId: this._webcamProducer.id });
		}
		catch (error)
		{
		}

		this._webcamProducer = null;
	}

	async changeWebcam()
	{

		try
		{
			await this._updateWebcams();

			const array = Array.from(this._webcams.keys());
			const len = array.length;
			this.baseService.myalert("len:"+len);
			const deviceId =
				this._webcam.device ? this._webcam.device.deviceId : undefined;
			
				this.baseService.myalert("deviceId:"+deviceId+JSON.stringify(array));
			let idx = array.indexOf(deviceId);

			if (idx < len - 1)
				idx++;
			else
				idx = 0;

			this._webcam.device = this._webcams.get(array[idx]);

			// Reset video resolution to HD.
			this._webcam.resolution = 'hd';

			if (!this._webcam.device)
				throw new Error('no webcam devices');

			// Closing the current video track before asking for a new one (mobiles do not like
			// having both front/back cameras open at the same time).
			this.baseService.myalert("stop1:"+len);
			this._webcamProducer.track.stop();
			this.baseService.myalert("stop2:"+len);

			const stream = await navigator.mediaDevices.getUserMedia(
				{
					video :
					{
						deviceId : { exact: this._webcam.device.deviceId },
						...this.VIDEO_CONSTRAINS[this._webcam.resolution]
					}
				});
			
			let localVideo=document.getElementById("local_video");
			
				this.playVideo(localVideo, stream);

			const track = stream.getVideoTracks()[0];

			await this._webcamProducer.replaceTrack({ track });

		
		}
		catch (error)
		{
			
		}

	}

async enableMic()
	{
		this.baseService.myalert("mic")
		if(!this.Mic){
			this.baseService.myalert("mic-out")
			return;
		}
		if (this._micProducer)
			return;

		let track;
		this.baseService.myalert("mic-track")
		// try
		// {
			let stream:any;
			// if (!this._externalVideo)
			// {
				try{
					this.baseService.myalert("mic-trac111")
				 stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				 this.baseService.myalert("mic-track222")
				}catch(e){
					this.baseService.myalert("audioe:"+e)
					this.baseService.myalert("audioe:"+JSON.stringify(e))
					return;
				}
				track = stream.getAudioTracks()[0];
			// }
			// else
			// {
			// 	 stream = await this._getExternalVideoStream();
			// 	track = stream.getAudioTracks()[0].clone();
			// }
			this.baseService.myalert("mic-track222333")
			this._micProducer = await this._sendTransport.produce(
				{
					track,
					codecOptions :
					{
						opusStereo : 1,
						opusDtx    : 1
					}
				});

			// store.dispatch(stateActions.addProducer(
			// 	{
			// 		id            : this._micProducer.id,
			// 		paused        : this._micProducer.paused,
			// 		track         : this._micProducer.track,
			// 		rtpParameters : this._micProducer.rtpParameters,
			// 		codec         : this._micProducer.rtpParameters.codecs[0].mimeType.split('/')[1]
			// 	}));

			this._micProducer.on('transportclose', () =>
			{
				this._micProducer = null;
			});

			this._micProducer.on('trackended', () =>
			{
				// store.dispatch(requestActions.notify(
				// 	{
				// 		type : 'error',
				// 		text : 'Microphone disconnected!'
				// 	}));
				this.disableMic()
					.catch(() => {});
			});
		// }
		// catch (error)
		// {
		// 	this.baseService.myalert('enableMic() | failed:%o'+JSON.stringify(error));

		// 	// store.dispatch(requestActions.notify(
		// 	// 	{
		// 	// 		type : 'error',
		// 	// 		text : `Error enabling microphone: ${error}`
		// 	// 	}));

		// 	if (track)
		// 		track.stop();
		// }
	}

	async _getExternalVideoStream()
	{
		if (this._externalVideoStream)
			return this._externalVideoStream;

		if (this._externalVideo.readyState < 3)
		{
			await new Promise((resolve) => (
				this._externalVideo.addEventListener('canplay', resolve)
			));
		}

		if (this._externalVideo.captureStream)
			this._externalVideoStream = this._externalVideo.captureStream();
		else if (this._externalVideo.mozCaptureStream)
			this._externalVideoStream = this._externalVideo.mozCaptureStream();
		else
			throw new Error('video.captureStream() not supported');

		return this._externalVideoStream;
	}

	async disableMic()
	{
		
		if (!this._micProducer)
			return;

		this._micProducer.close();


		try
		{
			await this._protoo.request(
				'closeProducer', { producerId: this._micProducer.id });
		}
		catch (error)
		{
			
		}

		this._micProducer = null;
	}



	async _updateWebcams()
	{
		this.baseService.myalert("updatecams")

		if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
			alert("不支持 enumerateDevices() .");
			return;
		}
		
		// 列出相机和麦克风.
		
		// navigator.mediaDevices.enumerateDevices()
		// .then(function(devices) {
		// 	devices.forEach(function(device) {
		// 		alert(device.kind + ": " + device.label +
		// 								" id = " + device.deviceId);
		// 	});
		// })
		// .catch(function(err) {
		// 	alert(err.name + ": " + err.message);
		// });


		// Reset the list.
		this._webcams = new Map();
		this.baseService.myalert("updatecams:_webcams")
		const devices = await navigator.mediaDevices.enumerateDevices();
		this.baseService.myalert("enumerateDevices:_webcams")
		for (const device of devices)
		{
			if (device.kind !== 'videoinput')
				continue;

			this._webcams.set(device.deviceId, device);
		}
		this.baseService.myalert("enumerateDevices:222")
		const array = Array.from(this._webcams.values());
		const len = array.length;
		this.baseService.myalert("333:_webcams")
		const currentWebcamId =
			this._webcam.device ? this._webcam.device.deviceId : undefined;
			this.baseService.myalert("333:currentWebcamId")
		if (len === 0){
			this._webcam.device = null;
		}
		else if (!this._webcams.has(currentWebcamId)){
			this._webcam.device = array[0];
		}
		this.baseService.myalert("333:this._webcam.device")
		this.baseService.myalert("333:this._webcam.device"+JSON.stringify(this._webcam.device))
	}

	async enableWebcam()
	{
		this.baseService.myalert("dwebcam")
		if (this._webcamProducer)
			return;

		if (!this._mediasoupDevice.canProduce('video'))
		{
			this.baseService.myalert("err:dwebcam")
			return;
		}


		// cordova.plugins.iosrtc.getUserMedia(
		// 	// constraints
		// 	{ audio: false, video: true },
		// 	// success callback
		// 	function (stream) {
		// 		console.log('got local MediaStream: ', stream);

		// 		let localVideo=document.getElementById("local_video");
			
		// 		this.playVideo(localVideo, stream);
		
		// 		// pc.addStream(stream);
		// 	},
		// 	// failure callback
		// 	function (error) {
		// 		console.error('getUserMedia failed: ', error);
		// 	}
		// );


		let track;
		let device;

		this.baseService.myalert("enableWebcam")

		try
		{
			// if (!this._externalVideo)
			// {
				await this._updateWebcams();
				device = this._webcam.device;
				const { resolution } = this._webcam;

				if (!device){
					this.baseService.myalert("no webcam devices")
					throw new Error('no webcam devices');
					this.baseService.myalert("no webcam devices")
				}else{
					this.baseService.myalert("has webcam devices")
				}
				const stream = await navigator.mediaDevices.getUserMedia(
					{
						video :
						{
							deviceId : { exact: device.deviceId },
							...this.VIDEO_CONSTRAINS[resolution]
						}
					});
					this.baseService.myalert("local_video")
					let localVideo=document.getElementById("local_video");
			
			 this.playVideo(localVideo, stream);

				track = stream.getVideoTracks()[0];
			// }
			// else
			// {
			// 	device = { label: 'external video' };

			// 	const stream = await this._getExternalVideoStream();

			// 	track = stream.getVideoTracks()[0].clone();
			// }
					this.baseService.myalert("this._useSimulcast:"+this._useSimulcast);
			if (!this._useSimulcast)
			{
				this.baseService.myalert("_sendTransport:"+this._useSimulcast);
				this._webcamProducer = await this._sendTransport.produce(
					{
						track,
						encodings    : this.VIDEO_ENCODINGS,
						codecOptions :
						{
							videoGoogleStartBitrate : 1000
						}
					});
					this.baseService.myalert("this._webcamProducer"+JSON.stringify(this._webcamProducer))
			}
			else
			{
				this._webcamProducer = await this._sendTransport.produce({ track });
			}

		

			this._webcamProducer.on('transportclose', () =>
			{
				this._webcamProducer = null;
			});

			this._webcamProducer.on('trackended', () =>
			{
		

				// this.disableWebcam()
					// .catch(() => {});
			});
		}
		catch (error)
		{

		

			// if (track)
			// 	track.stop();
		}

	}

  close()
	{
		if (this._closed)
			return;

		this._closed = true;

		// logger.debug('close()');

		// Close protoo Peer
		this._protoo.close();

		// Close mediasoup Transports.
		if (this._sendTransport)
			this._sendTransport.close();

		if (this._recvTransport)
			this._recvTransport.close();
	}

  




}
