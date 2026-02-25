import { useParams } from "react-router";
import AddressForm from "./AddressForm.tsx";
import AcceptCGU from "./AcceptCGU.tsx";
import Button from "./Button.tsx";
import { useEffect, useState } from "react";
import { fetchIntents } from "../mock/intents.ts";

interface Page {
  "accept-cgu"?: { label: string };
  "address-form": {
    default: string;
    "visible-if": { "accept-cgu": boolean };
  };
  button: { label: string };
}

export default function ScreenRenderer() {
  // récupération de l'identifiant de l'écran à partir de l'URL
  const { screenId } = useParams();
  const [intents, setIntents] = useState<null | Page>(null);
  const [checked, setChecked] = useState<boolean>(false);
  // À RÉALISER :
  // Ici, vous devez :
  // 1. Simuler un appel à /intent/:screen_id (les données sont fournies dans /src/mock/intents.ts).
  // 2. En fonction du screen_id, sélectionner un des deux payloads (simple ou avec visible-if).
  // 3. Parcourir dynamiquement les intents reçus.
  // 4. Pour chaque intent, afficher le composant correspondant avec ses props.

  // 5. Bonus : Gérer les conditions d'affichage si l'intent possède un champ "visible-if".
  const resultPromise = async () => {
    if (screenId) {
      return await fetchIntents(screenId);
    }
    return null;
  };

  const getIntents = async () => {
    const result = await resultPromise();
    if (result) {
      setIntents(result as Page);
    }
  };

  useEffect(() => {
    getIntents();
  }, [screenId]);

  return (
    <div className="p-4">
      {/* Exemple pour montrer les composants disponibles */}
      {/* Vous pouvez supprimer les lignes ci-après pour laisser place à votre implémentation */}
      {/* Vous pouvez également modifier les composants fournis pour qu'ils répondent à vos besoins */}
      <p className="text-xl font-bold mb-2">Écran dynamique : {screenId}</p>

      <p>Showroom</p>
      {/* Rendu dynamique des composants à insérer ici */}
      <>
        {intents &&
          Object.keys(intents).map((intent, index) => {
            if (intent === "address-form" && intents["address-form"]) {
              return (
                <AddressForm
                  key={`address-form-${index}`}
                  default={intents["address-form"].default}
                  isVisible={
                    intents["address-form"]["visible-if"]?.["accept-cgu"]
                      ? checked
                      : true
                  }
                />
              );
            }
            if (intent === "accept-cgu" && intents["accept-cgu"]) {
              return (
                <AcceptCGU
                  key={`accept-cgu-${index}`}
                  label={intents["accept-cgu"].label}
                  checked={checked}
                  setChecked={setChecked}
                />
              );
            }
            if (intent === "button" && intents["button"]) {
              return (
                <Button
                  key={`button-${index}`}
                  label={intents["button"].label}
                />
              );
            }
          })}
      </>
    </div>
  );
}
