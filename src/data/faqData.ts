export type faqData = {
	category: string; 
	questions: {
		question: string;
		answer: string;   
	}[];
};

const faqData: faqData[] = [
	{
		category: "Général",
		questions: [
			{
				question: "Qu’est-ce qu’une adoption temporaire ?",
				answer: "L'adoption temporaire consiste à héberger un animal en attente d’adoption pendant une période définie."
			},

			{
				question: "Pourquoi les animaux ont-ils besoin d’une adoption temporaire ?",
				answer: "L’adoption temporaire est une solution précieuse, surtout lorsque les refuges manquent de place. Cela offre un cadre sécurisant aux animaux et leur permet de bénéficier d'un environnement plus calme, plus chaleureux et plus stable, en attendant leur adoption définitive."
			},

			{
				question: "Quel est le rôle du site dans le processus d’adoption temporaire ?",
				answer: "FetchMeHome est une plateforme de mise en relation. Les associations y publient les profils d’animaux en recherche d’adoption temporaire. Les familles d’accueil bénévoles peuvent postuler en ligne via un formulaire dédié. L’échange et le suivi sont ensuite gérés directement par l’association. Le site ne prend aucune décision ni responsabilité concernant le suivi des animaux. Cependant, FetchMeHome facilite le premier contact entre les deux parties, de manière sécurisée et organisée."

			},

      	]
    },
    {
		category: "Adoption",
		questions: [
			{
				question: "Comment devenir famille d’accueil bénévole ?",
				answer: "Il vous suffit de créer un compte sur FetchMeHome et de remplir une première demande d’adoption temporaire. Ce formulaire permet à l’association de mieux connaître votre profil et vos conditions d’hébergement. L’association étudiera ensuite votre demande et vous contactera directement."
			},

			{
				question: "Comment fonctionne le processus d'adoption temporaire ?",
				answer: "Après avoir envoyé votre formulaire, l’association examine votre demande d'adoption temporaire et vous recontacte. En cas d’accord, les modalités d’accueil (équipements, conditions spécifiques, etc) sont définies directement entre vous et l’association. L’accueil commencera à la date convenue et le suivi sera ensuite assuré par l’association."
			},

			{
				question: "Est-ce que je peux accueillir temporairement un animal si j’ai déjà d’autres animaux ?",
				answer: "Oui, tout à fait. De nombreuses familles d’accueil bénévoles ont déjà des animaux chez elles. Toutefois, chaque association évaluera la compatibilité entre l’animal à placer et vos propres animaux, avant de valider un accueil. Il est donc important de le mentionner dans le formulaire de demande d'adoption temporaire."
			},
		]
    },
	{
		category: "Aide",
		questions: [
			{
				question: "Qui contacter si j’ai un problème avec l’animal ?",
				answer: "En cas de problème (santé, comportement, etc.), vous pouvez directement contacter l’association responsable de l’animal. L’association  reste votre interlocutrice principale tout au long de l’accueil et pourra vous conseiller ou intervenir si nécessaire."
			},

			{
				question: "Comment signaler un comportement inapproprié sur la plateforme ?",
				answer: "Si vous êtes témoin ou victime d’un comportement inapproprié, suspect ou irrespectueux sur la plateforme, vous pouvez le signaler via le formulaire de contact disponible sur FetchMeHome. L’équipe technique examinera votre signalement et prendra les mesures nécessaires dans les plus brefs délais."
			},
		]
    }
];
  	
export default faqData;