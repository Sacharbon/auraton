import React, {useState, useRef, useEffect} from "react";
import {loginUser} from "@/utils/faceLogin.ts";
import {register} from "@/utils/register.ts";
import {registerUser} from "@/utils/faceRegister.ts";
import {newEvent} from "@/utils/newEvent.ts";
import Image from "next/image";
import ReactModal from "react-modal";
import {formatDate} from "@zag-js/i18n-utils";

interface EventModalProps {
  handleClose: () => void;
}

const EventModal = ({handleClose}: EventModalProps) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    label: "",
    image: null as File | null,
  });

  const labels = ["Sport", "Sortie", "Réunion", "Anniversaire", "Autre"];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type.startsWith("image/")) {
      setEventData((prev) => ({
        ...prev,
        image: file,
      }));
    } else {
      alert("Veuillez télécharger une image valide.");
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvel événement créé :", eventData);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [user, setUser] = useState({});
  const [displayName, setDisplayName] = useState(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  let recognizeInterval: any = null;
  let done = false;

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };

      reader.readAsDataURL(file);
    });
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      recognizeInterval = setInterval(async () => {
        if (videoRef.current) {
          const [descriptor, res] = await loginUser(videoRef.current);
          if (res && !done) {
            done = true;
            setUser(res);
            stopCamera();
            setSubscribed(true);
            await newEvent(res.id, eventData.label, eventData.title, eventData.description, eventData.image, eventData.date);
            handleClose();
            window.href.reload();
          } else {
            setShowRegister(true);
          }
        }
      }, 1000);
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err);
    }
  };

  const stopCamera = () => {
    setTimeout(() => {
      clearInterval(recognizeInterval);
      setDisplayName(false);
      streamRef.current.getTracks().forEach((track) => {
        if (track.readyState == "live" && track.kind === "video") {
          track.stop();
        }
      });
    }, 3000);
  };

  useEffect(() => {
    const dede = async () => {
      if (eventData.image) {
        setImgSrc((await fileToDataUrl(eventData.image)));
      }
    }
    dede();
  }, [eventData]);

  return (
    <div className="flex flex-col h-full p-1 justify-between">
      <h1 className="text-2xl font-semibold mb-6 flex justify-center w-full">
        Créer un nouvel événement
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full h-[93%] flex flex-col justify-between"
      >
        <div
          onClick={handleImageClick}
          className="w-full h-1/2 bg-gray-200 rounded-lg cursor-pointer relative overflow-hidden"
        >
          {eventData.image ? (
            <img
              src={imgSrc}
              alt="Aperçu de l'événement"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              Cliquez pour ajouter une image
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Cache l'input
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-md font-semibold text-gray-700"
          >
            Titre de l'événement :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Entrez un titre"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-md text-gray-700 font-semibold"
          >
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Entrez une description"
            required
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <div className="flex flex-row justify-between w-full gap-4 h-20">
          <div className="w-full h-fit">
            <label
              htmlFor="date"
              className="block text-md font-semibold text-gray-700"
            >
              Date :
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md px-2 py-1 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>

          <div className="w-full h-fit">
            <label
              htmlFor="label"
              className="block text-md text-gray-700 font-semibold"
            >
              Tag :
            </label>
            <select
              id="label"
              name="label"
              value={eventData.label}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-md bg-gray-100 p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Choisir un tag</option>
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            onClick={() => {
                setDisplayName(true);
                startCamera();
              }
            }
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Créer
          </button>
        </div>
      </form>
      <ReactModal
          isOpen={displayName}
          style={registerStyles}
          ariaHideApp={false}
      >
        <div className="w-full h-full justify-center items-center flex flex-col">
          <Image
              src="https://cdn-icons-png.flaticon.com/512/6022/6022815.png"
              alt="moulaga"
              width={150}
              height={150}
          />
          {user && (
              <p className="font-semibold text-3xl pt-16">
                Bonjour {user.firstName} !
              </p>
          )}
          <video
              ref={videoRef}
              playsInline
              autoPlay
              className="mt-4 w-0 h-0 rounded-lg"
              id="video"
          >
            Flux vidéo non disponible.
          </video>
          {showRegister && (
              <>
                <h1>Enregistrez-vous</h1>
                <div className="pb-5 pt-5">
                  <label
                      htmlFor="firstname"
                      className="block text-md font-semibold text-gray-700"
                  >
                    Prénom
                  </label>
                  <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Entrez votre prénom"
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="pb-5">
                  <label
                      htmlFor="lastname"
                      className="block text-md font-semibold text-gray-700"
                  >
                    Nom
                  </label>
                  <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Entrez votre nom"
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <button
                    type="button"
                    onClick={() => {
                      registerUser(videoRef.current, firstName, lastName, null, null)
                          .then(async (user) => {
                            setShowRegister(false);
                            const [descriptor, res] = await loginUser(videoRef.current);
                            if (res) {
                              setUser(res);
                              stopCamera();
                            }
                          })
                    }
                    }
                    className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  S'enregistrer
                </button>
              </>
          )}
        </div>
      </ReactModal>
    </div>
  );
};

const registerStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "60%",
    width: "30%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    border: "none",
    padding: "1rem",
    backgroundColor: "white",
    overflow: "hidden",
  },
};


export default EventModal;
