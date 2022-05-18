<?php

namespace App\Twig;

use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class CategoryListExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return [
            new TwigFunction("categoryList", [
                $this,
                "renderCategoryList"
            ], [
                'needs_environment' => true,
                'is_safe' => ['html']
            ])
        ];
    }

    public function renderCategoryList(Environment $environment, $categories = null, $controller = true): string
    {
        return $environment->render("widget/categoryList.html.twig", ['categories' => $categories, 'controller' => $controller]);
    }
}
