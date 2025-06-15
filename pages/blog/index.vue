<script setup lang="ts"></script>

<template>
    <div 
        class="
            flex flex-col
            gap-6
            p-4
            items-center
            lg:grid lg:grid-cols-2
            lg:items-start
        "
    >
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto">
            <PagesBlogCard 
                title="What's new in WCAG 2.2." 
                date="05.10.2023" 
                read-more="Read more about it on the W3 website:" 
                post-link="https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/" 
                thumbnail-link-top="/images/article_0_wcag_thumbnail_2.png" 
                thumbnail-link-bottom="/images/article_0_wcag_thumbnail_1.png"
            >
                <template #description>
                    This page lists the new success criteria in WCAG 2.2, with:
                    <br>
                    - A brief introduction of what to do and why it’s important
                    <br>
                    - Quotes from personas to help you understand some aspects of the success criteria
                    <br>
                </template>
            </PagesBlogCard>
        </div>
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto">
            <PagesBlogCard 
                title="WCAG 2.2: New Success Criteria, More Inclusive Content" 
                date="28.01.2025" 
                read-more="Read more about it on the WCAG website:" 
                post-link="https://www.wcag.com/blog/wcag-2-2-aa-summary-and-checklist-for-website-owners/" 
                thumbnail-link-top="/images/article_1_wcag_thumbnail_2.png" 
                thumbnail-link-bottom="/images/article_1_wcag_thumbnail_0.png"
            >
                <template #description>
                    This page lists a checklist of new success criteria in WCAG 2.2 standard, including:
                    <br>
                    - Benefits of adopting the WCAG 2.2 AA standard
                    <br>
                    - A brief comparison of WCAG 2.1 and 2.2.
                    <br>
                </template>
            </PagesBlogCard>
        </div>
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto">
            <PagesBlogCard 
                title="4 Web Accessibility Issues You Can Fix in 5 Minutes (Or Less)" 
                date="07.04.2025" 
                read-more="Read more about it on the Bureau of Internet Accessibility website:" 
                post-link="https://www.boia.org/blog/4-web-accessibility-issues-you-can-fix-in-5-minutes-or-less" 
                thumbnail-link-top="/images/article_2_boia_thumbnail_1.png" 
                thumbnail-link-bottom="/images/article_2_boia_thumbnail_0.png"
            >
                <template #description>
                    On this page you will find Quick fixes for common accessibility problems that can significantly improve user experience.
                    <br>
                </template>
            </PagesBlogCard>
        </div>
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto">
            <PagesBlogCard 
                title="Simple Steps to Enhance Accessibility in Your Website's Login Process" 
                date="07.01.2025" 
                read-more="Read more about it on the Accessibility website:" 
                post-link="https://www.accessibility.com/blog/simple-steps-to-enhance-accessibility-in-your-websites-login-process" 
                thumbnail-link-top="/images/article_3_accessibility_thumbnail_1.png" 
                thumbnail-link-bottom="/images/article_3_accessibility_thumbnail_0.png"
            >
                <template #description>
                    On this page you will find Guidance on making login forms more accessible to users with disabilities.
                    <br>
                </template>
            </PagesBlogCard>
        </div>
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto">
            <PagesBlogCard 
                title="Mastering Web Accessibility: Making Drop-Down Menus User-Friendly" 
                date="04.03.2024" 
                read-more="Read more about it on the A11y-Collective website:" 
                post-link="https://www.a11y-collective.com/blog/mastering-web-accessibility-making-drop-down-menus-user-friendly/" 
                thumbnail-link-top="/images/article_4_a11y_thumbnail_0.png" 
                thumbnail-link-bottom="/images/article_4_a11y_thumbnail_1.png"
            >
                <template #description>
                    On this page you will find Best practices for designing accessible drop-down menus that are easy to navigate.
                    <br>
                </template>
            </PagesBlogCard>
        </div>
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto">
            <PagesBlogCard 
                title="Designing For All: Neurodiversity And Digital Accessibility" 
                date="09.03.2024" 
                read-more="Read more about it on the Continual Engine website:" 
                post-link="https://www.continualengine.com/blog/neurodiversity-and-digital-accessibility/" 
                thumbnail-link-top="/images/article_5_ce_thumbnail_1.png" 
                thumbnail-link-bottom="/images/article_5_ce_thumbnail_0.png"
            >
                <template #description>
                    On this page you will find:
                    <br>
                    - A brief introduction to neurodiversity
                    <br>
                    - How neurodiversity applies to digital accesibility
                    <br>
                </template>
            </PagesBlogCard>
        </div>
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto md:h-auto">
            <PagesBlogCard 
                title="The Great Accessibility Blogs Roundup" 
                date="" 
                read-more="Read more about it on the Digital A11y website:" 
                post-link="https://www.digitala11y.com/accessibility-blogs/" 
                thumbnail-link-top="/images/article_6_da11y_thumbnail_1.png" 
                thumbnail-link-bottom="/images/article_6_da11y_thumbnail_0.png"
            >
                <template #description>
                    On this page you will find a Compilation of <span class="font-bold">100+ </span>articles and blogs on Accessibility.
                    <br>
                </template>
            </PagesBlogCard>
        </div>
        <div class="md:flex md:items-start md:justify-center max-w-full w-128 md:w-auto md:h-auto">
            <PagesBlogCard 
                title="Top 10 Accessibility Blogs to Follow" 
                date="18.05.2021" 
                read-more="Read more about it on the Rev website:" 
                post-link="https://www.rev.com/blog/the-top-10-accessibility-blogs-to-follow" 
                thumbnail-link-top="/images/article_7_rev_thumbnail_1.png" 
                thumbnail-link-bottom="/images/article_7_rev_thumbnail_0.png"
            >
                <template #description>
                    On this page you will find a Compilation of 10 ongoing blog producers on Accessibility, User Experience and adjacent topics.
                    <br>
                </template>
            </PagesBlogCard>
        </div>
    </div>
</template>
