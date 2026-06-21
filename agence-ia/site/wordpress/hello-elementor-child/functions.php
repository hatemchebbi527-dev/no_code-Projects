<?php
/**
 * Child theme AutomaIA — fonctions.
 *
 * Rôle principal : charger la feuille de style du thème parent (Hello Elementor)
 * puis celle du child theme, dans le bon ordre.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Sécurité : empêche l'accès direct au fichier.
}

/**
 * Charge les styles du thème parent puis du child theme.
 */
function automaia_child_enqueue_styles() {

    // 1. Style du thème parent (Hello Elementor)
    wp_enqueue_style(
        'hello-elementor-parent-style',
        get_template_directory_uri() . '/style.css'
    );

    // 2. Style du child theme (dépend du parent, donc chargé après)
    wp_enqueue_style(
        'automaia-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( 'hello-elementor-parent-style' ),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'automaia_child_enqueue_styles' );
