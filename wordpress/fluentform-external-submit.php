<?php
/**
 * Plugin Name: FormaSharp Fluent Forms External Submit
 * Description: Public REST endpoint so the Next.js site can submit Fluent Forms entries (forms 3 + 4).
 * Version: 1.0.0
 *
 * Install: Upload this file as a plugin (zip with this single file) or paste into Code Snippets
 * (run everywhere). Set the same secret in Next as FLUENTFORMS_SUBMIT_SECRET.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('fluentform/loaded', function ($app) {
    $app->router->post('/external-submit', function () use ($app) {
        $expected = defined('FORMASHARP_FF_SUBMIT_SECRET')
            ? FORMASHARP_FF_SUBMIT_SECRET
            : (string) getenv('FORMASHARP_FF_SUBMIT_SECRET');

        // Fallback: wp-config or option — prefer constant in wp-config.php:
        // define('FORMASHARP_FF_SUBMIT_SECRET', 'your-long-random-secret');
        if ($expected === '' || $expected === false) {
            $expected = (string) get_option('formasharp_ff_submit_secret', '');
        }

        $provided = $app->request->header('X-FormaSharp-Secret');
        if (!$expected || !hash_equals((string) $expected, (string) $provided)) {
            return $app->response->json(
                [
                    'code' => 'forbidden',
                    'message' => 'Invalid or missing submit secret.',
                ],
                401
            );
        }

        try {
            $data = $app->request->get('data');
            if (!is_array($data)) {
                $data = [];
            }

            $data['_wp_http_referer'] = isset($data['_wp_http_referer'])
                ? sanitize_url(urldecode((string) $data['_wp_http_referer']))
                : '';

            $app->request->merge(['data' => $data]);

            $formId = intval($app->request->get('form_id'));
            if (!$formId) {
                return $app->response->json(
                    [
                        'code' => 'invalid_form',
                        'message' => 'form_id is required.',
                    ],
                    422
                );
            }

            // Only allow the two public site forms.
            $allowed = [3, 4];
            if (!in_array($formId, $allowed, true)) {
                return $app->response->json(
                    [
                        'code' => 'forbidden_form',
                        'message' => 'This form is not enabled for external submit.',
                    ],
                    403
                );
            }

            $response = (new \FluentForm\App\Services\Form\SubmissionHandlerService())
                ->handleSubmission($data, $formId);

            return $app->response->json($response);
        } catch (\FluentForm\Framework\Validator\ValidationException $e) {
            return $app->response->json($e->errors(), $e->getCode() ?: 422);
        } catch (\Throwable $e) {
            return $app->response->json(
                [
                    'code' => 'submit_failed',
                    'message' => 'Submission failed.',
                ],
                500
            );
        }
    });
});
