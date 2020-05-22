<?php

declare(strict_types=1);

/**
 * PHP version 7
 * Hello World Test
 *
 * Sample test
 *
 * @category   Something
 * @package    HelloWorld\Test
 * @subpackage SomePackage
 * @author     Test <test@test.com>
 * @license    https://www.gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link       https://yoursite.com
 * @since      1.0.0
 */


namespace HelloWorld\Test;

use HelloWorld\HelloWorld;
use PHPUnit\Framework\TestCase;

/**
 * Hello World Test Class
 *
 * Super class
 *
 * @category   Something
 * @package    HelloWorld\Test
 * @subpackage SomePackage
 * @author     Test <test@test.com>
 * @license    https://www.gnu.org/licenses/gpl-3.0.txt GNU/GPLv3
 * @link       https://yoursite.com
 */
class HelloWorldTest extends TestCase
{
    /**
     * Test sayHello
     *
     * Testing the greeting
     *
     * @return nothing
     */
    public function testMethodSayHelloReturnsHelloWorldString()
    {
        $expectedResult = 'Hello World!';
        $helloWorld = new HelloWorld();
        $actualResult = $helloWorld->sayHello();
        $this->assertSame(
            $expectedResult,
            $actualResult,
            sprintf('"%s" does not match "%s"!', $actualResult, $expectedResult)
        );
    }
}
