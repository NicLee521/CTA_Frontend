import React from 'react';
import Layout from '../_layout';
import styles from '../../styles/privacy.module.css';

export default function PrivacyPolicy() {
    return (
        <Layout>
        <main className={styles.mainContainer}>
            <h1 className={styles.header}>Privacy Policy for Call to Adventure Story Generator</h1>
            <p className={styles.lastUpdated}>Last Updated: 11/14/2023</p>
    
            <section className={styles.content}>
            <p>Welcome to Call to Adventure Story Generator. We are committed to protecting your personal information and your right to privacy. This privacy policy outlines how we collect, use, and handle your personal information when you use our app/website.</p>
    
            <h2>1. Information We Collect</h2>
            <p>In order to provide our services, we collect the following information:</p>
            <ul>
                <li><strong>Profile ID:</strong> We collect your unique profile identifier to facilitate your identification and authentication on our platform.</li>
                <li><strong>Email Address:</strong> We use your email address for identification purposes and to communicate with you regarding your account or our services.</li>
                <li><strong>Profile Photo:</strong> Your profile photo is used as an avatar on our site to personalize your user experience.</li>
            </ul>
            <p>We do not collect any other personal information beyond what is necessary for the functioning of our services.</p>
            <h2>2. How We Use Your Information</h2>
            <p>The information we collect is used exclusively for the following purposes:</p>
            <ul>
                <li>To identify and authenticate users on our platform.</li>
                <li>To display your chosen profile photo as your avatar on our site.</li>
                <li>To communicate with you about your account or any changes to our services.</li>
            </ul>
            <p>We do not collect any other personal information beyond what is necessary for the functioning of our services.</p>
            <h2>3. Sharing Your Information</h2>
            <p>We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes.</p>
            <h2>4. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
            <h2>5. Your Rights</h2>
            <p>You have the right to access, update, or delete the information we have on you. Any requests regarding your data can be directed to our support team at niclee521@gmail.com</p>
            <h2>6. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
            </section>
    
            <section className={styles.contact}>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at niclee521@gmail.com</p>
            </section>
        </main>
        </Layout>
    )
};

