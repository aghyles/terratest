'use client';
import PageContainer from 'src/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from 'src/app/(DashboardLayout)/components/shared/DashboardCard';


const Faq = () => {
  return (
    <PageContainer title="FAQ" description="this is FAQ">

      <DashboardCard title="Foire Aux Questions (FAQ) - Utilisation du Logiciel d'Audit Énergétique :">

      <div id="faq-container">

            <h2>Questions Générales :</h2>
            <ol>
                <li>
                    <p><strong>Comment puis-je accéder au logiciel d'audit énergétique ?</strong><br />
                    Vous pouvez accéder au logiciel en vous connectant à [lien d'accès].</p>
                </li>
                <li>
                    <p><strong>Quelles sont les exigences système pour utiliser le logiciel ?</strong><br />
                    Le logiciel est accessible via un navigateur web. Assurez-vous d'utiliser une version récente de Google Chrome, Firefox, ou Safari.</p>
                </li>
                <li>
                    <p><strong>Comment créer un nouveau projet d'audit énergétique ?</strong><br />
                    Après vous être connecté, cliquez sur "Nouveau Projet" et suivez les étapes pour saisir les informations requises.</p>
                </li>
                <li>
                    <p><strong>Est-il possible de revenir et de modifier les données d'un projet existant ?</strong><br />
                    Oui, vous pouvez modifier les données à tout moment en accédant au projet concerné et en cliquant sur "Modifier".</p>
                </li>
            </ol>

            <h2>Saisie des Données :</h2>
            <ol start={5}>
                <li>
                    <p><strong>Comment entrer les détails sur les équipements de chauffage et de refroidissement ?</strong><br />
                    Accédez à la section "Équipements" dans votre projet et utilisez les formulaires spécifiques pour saisir ces détails.</p>
                </li>
                <li>
                    <p><strong>Puis-je importer des données à partir de feuilles de calcul existantes ?</strong><br />
                    Oui, vous pouvez importer des données à partir de fichiers Excel. Utilisez l'option "Importer" dans la section appropriée.</p>
                </li>
            </ol>

            <h2>Analyse des Données :</h2>
            <ol start={7}>
                <li>
                    <p><strong>Comment interpréter les résultats générés par le logiciel ?</strong><br />
                    Les résultats seront présentés dans des graphiques et des tableaux. Consultez la section "Rapport" pour une analyse détaillée.</p>
                </li>
                <li>
                    <p><strong>Le logiciel propose-t-il des recommandations pour améliorer l'efficacité énergétique ?</strong><br />
                    Oui, la section "Recommandations" fournira des suggestions spécifiques basées sur les données saisies.</p>
                </li>
            </ol>

            <h2>Rapports et Exportation :</h2>
            <ol start={9}>
                <li>
                    <p><strong>Comment générer un rapport d'audit énergétique ?</strong><br />
                    Accédez à la section "Rapport" de votre projet et utilisez l'option "Générer Rapport".</p>
                </li>
                <li>
                    <p><strong>Puis-je exporter le rapport dans différents formats ?</strong><br />
                    Oui, vous pouvez exporter le rapport au format PDF ou Excel pour le partager ou l'imprimer.</p>
                </li>
            </ol>

            <h2>Support Technique :</h2>
            <ol start={11}>
                <li>
                    <p><strong>Que faire en cas de problème technique ou de question ?</strong><br />
                    Utilisez l'option "Support" pour accéder à notre centre d'aide ou contactez notre équipe d'assistance pour une aide personnalisée.</p>
                </li>
            </ol>

            <h2>Sécurité et Confidentialité :</h2>
            <ol start={12}>
                <li>
                    <p><strong>Comment le logiciel assure-t-il la confidentialité des données de mes projets ?</strong><br />
                    Le logiciel utilise des protocoles de sécurité avancés. Consultez notre politique de confidentialité pour plus d'informations.</p>
                </li>
            </ol>
        </div>

      </DashboardCard>
    </PageContainer>
  );
};

export default Faq;
